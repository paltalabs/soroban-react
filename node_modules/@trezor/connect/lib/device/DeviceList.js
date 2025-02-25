"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceList = exports.assertDeviceListConnected = void 0;
const utils_1 = require("@trezor/utils");
const transport_1 = require("@trezor/transport");
const constants_1 = require("../constants");
const events_1 = require("../events");
const Device_1 = require("./Device");
const types_1 = require("../types");
const transportInfo_1 = require("../data/transportInfo");
const debug_1 = require("../utils/debug");
const promiseUtils_1 = require("../utils/promiseUtils");
const utils_2 = require("../types/utils");
const _log = (0, debug_1.initLog)('DeviceList');
const createAuthPenaltyManager = (priority) => {
    const penalizedDevices = {};
    const get = () => 100 * priority +
        Object.keys(penalizedDevices).reduce((penalty, key) => Math.max(penalty, penalizedDevices[key]), 0);
    const add = (device) => {
        if (!device.isInitialized() || device.isBootloader() || !device.features.device_id)
            return;
        const deviceID = device.features.device_id;
        const penalty = penalizedDevices[deviceID] ? penalizedDevices[deviceID] + 500 : 2000;
        penalizedDevices[deviceID] = Math.min(penalty, 5000);
    };
    const remove = (device) => {
        if (!device.isInitialized() || device.isBootloader() || !device.features.device_id)
            return;
        const deviceID = device.features.device_id;
        delete penalizedDevices[deviceID];
    };
    const clear = () => Object.keys(penalizedDevices).forEach(key => delete penalizedDevices[key]);
    return { get, add, remove, clear };
};
const assertDeviceListConnected = deviceList => {
    if (!deviceList.isConnected())
        throw constants_1.ERRORS.TypedError('Transport_Missing');
};
exports.assertDeviceListConnected = assertDeviceListConnected;
class DeviceList extends utils_1.TypedEmitter {
    isConnected() {
        return !!this.transport;
    }
    pendingConnection() {
        return this.initPromise;
    }
    constructor({ messages, priority, debug, _sessionsBackgroundUrl, manifest, }) {
        super();
        this.devices = {};
        this.deviceCounter = Date.now();
        const transportLogger = (0, debug_1.initLog)('@trezor/transport', debug);
        this.handshakeLock = (0, utils_1.getSynchronize)();
        this.authPenaltyManager = createAuthPenaltyManager(priority);
        this.transportCommonArgs = {
            messages,
            logger: transportLogger,
            sessionsBackgroundUrl: _sessionsBackgroundUrl,
            id: (manifest === null || manifest === void 0 ? void 0 : manifest.appUrl) || 'unknown app',
        };
        this.transports = [
            new transport_1.BridgeTransport({
                latestVersion: (0, transportInfo_1.getBridgeInfo)().version.join('.'),
                ...this.transportCommonArgs,
            }),
        ];
    }
    createTransport(transportType) {
        const { transportCommonArgs } = this;
        if (typeof transportType === 'string') {
            switch (transportType) {
                case 'WebUsbTransport':
                    return new transport_1.WebUsbTransport(transportCommonArgs);
                case 'NodeUsbTransport':
                    return new transport_1.NodeUsbTransport(transportCommonArgs);
                case 'BridgeTransport':
                    return new transport_1.BridgeTransport({
                        latestVersion: (0, transportInfo_1.getBridgeInfo)().version.join('.'),
                        ...transportCommonArgs,
                    });
                case 'UdpTransport':
                    return new transport_1.UdpTransport(transportCommonArgs);
            }
        }
        else if (typeof transportType === 'function' && 'prototype' in transportType) {
            const transportInstance = new transportType(transportCommonArgs);
            if ((0, transport_1.isTransportInstance)(transportInstance)) {
                return transportInstance;
            }
        }
        else if ((0, transport_1.isTransportInstance)(transportType)) {
            if (!transportType.getMessage()) {
                transportType.updateMessages(transportCommonArgs.messages);
            }
            return transportType;
        }
        throw constants_1.ERRORS.TypedError('Runtime', `DeviceList.init: transports[] of unexpected type: ${transportType}`);
    }
    setTransports(transports) {
        const transportTypes = (transports === null || transports === void 0 ? void 0 : transports.length) ? transports : ['BridgeTransport'];
        this.transports = transportTypes.map(this.createTransport.bind(this));
    }
    onDeviceConnected(descriptor, transport) {
        const { path } = descriptor;
        const id = (this.deviceCounter++).toString(16).slice(-8);
        const device = new Device_1.Device({
            id: (0, types_1.DeviceUniquePath)(id),
            transport,
            descriptor,
            listener: lifecycle => this.emit(lifecycle, device.toMessageObject()),
        });
        this.devices[path] = device;
        const penalty = this.authPenaltyManager.get();
        this.handshakeLock(async () => {
            if (this.devices[path]) {
                await device.handshake(penalty);
            }
        });
    }
    onDeviceDisconnected(descriptor) {
        const { path } = descriptor;
        const device = this.devices[path];
        if (device) {
            device.disconnect();
            delete this.devices[path];
        }
    }
    onDeviceSessionChanged(descriptor) {
        const device = this.devices[descriptor.path];
        if (device) {
            device.updateDescriptor(descriptor);
        }
    }
    onDeviceRequestRelease(descriptor) {
        var _a;
        (_a = this.devices[descriptor.path]) === null || _a === void 0 ? void 0 : _a.usedElsewhere();
    }
    init(initParams = {}) {
        if (!this.initPromise) {
            _log.debug('Initializing transports');
            this.initPromise = this.createInitPromise(initParams);
        }
        return this.initPromise;
    }
    createInitPromise(initParams) {
        return this.selectTransport(this.transports)
            .then(transport => this.initializeTransport(transport, initParams))
            .then(transport => {
            this.transport = transport;
            this.emit(transport_1.TRANSPORT.START, this.getTransportInfo());
            this.initPromise = undefined;
        })
            .catch(error => {
            this.cleanup();
            this.emit(transport_1.TRANSPORT.ERROR, error);
            this.initPromise = initParams.transportReconnect
                ? this.createReconnectPromise(initParams)
                : undefined;
        });
    }
    createReconnectPromise(initParams) {
        const { promise, reject } = (0, promiseUtils_1.resolveAfter)(1000, initParams);
        this.rejectPending = reject;
        return promise
            .then(this.createInitPromise.bind(this))
            .catch(() => { })
            .finally(() => {
            this.rejectPending = undefined;
        });
    }
    async selectTransport([transport, ...rest]) {
        const result = await transport.init();
        if (result.success)
            return transport;
        else if (rest.length)
            return this.selectTransport(rest);
        else
            throw new Error(result.error);
    }
    async initializeTransport(transport, initParams) {
        transport.on(transport_1.TRANSPORT.DEVICE_CONNECTED, d => this.onDeviceConnected(d, transport));
        transport.on(transport_1.TRANSPORT.DEVICE_DISCONNECTED, this.onDeviceDisconnected.bind(this));
        transport.on(transport_1.TRANSPORT.DEVICE_SESSION_CHANGED, this.onDeviceSessionChanged.bind(this));
        transport.on(transport_1.TRANSPORT.DEVICE_REQUEST_RELEASE, this.onDeviceRequestRelease.bind(this));
        transport.on(transport_1.TRANSPORT.ERROR, error => {
            this.cleanup();
            this.emit(transport_1.TRANSPORT.ERROR, error);
            if (initParams.transportReconnect) {
                this.initPromise = this.createReconnectPromise(initParams);
            }
        });
        const enumerateResult = await transport.enumerate();
        if (!enumerateResult.success) {
            throw new Error(enumerateResult.error);
        }
        const descriptors = enumerateResult.payload;
        const waitForDevicesPromise = initParams.pendingTransportEvent && descriptors.length
            ? this.waitForDevices(descriptors.length, 10000)
            : Promise.resolve();
        transport.handleDescriptorsChange(descriptors);
        transport.listen();
        await waitForDevicesPromise;
        return transport;
    }
    waitForDevices(deviceCount, autoResolveMs) {
        const { promise, resolve, reject } = (0, utils_1.createDeferred)();
        let transportStartPending = deviceCount;
        const autoResolveTransportEventTimeout = setTimeout(resolve, autoResolveMs);
        this.rejectPending = reject;
        const onDeviceConnect = () => {
            transportStartPending--;
            if (transportStartPending === 0) {
                resolve();
            }
        };
        this.on(events_1.DEVICE.CONNECT, onDeviceConnect);
        this.on(events_1.DEVICE.CONNECT_UNACQUIRED, onDeviceConnect);
        return promise.finally(() => {
            this.rejectPending = undefined;
            clearTimeout(autoResolveTransportEventTimeout);
            this.off(events_1.DEVICE.CONNECT, onDeviceConnect);
            this.off(events_1.DEVICE.CONNECT_UNACQUIRED, onDeviceConnect);
        });
    }
    getDeviceCount() {
        return Object.keys(this.devices).length;
    }
    getAllDevices() {
        return (0, utils_2.typedObjectKeys)(this.devices).map(key => this.devices[key]);
    }
    getOnlyDevice() {
        return this.getDeviceCount() === 1 ? Object.values(this.devices)[0] : undefined;
    }
    getDeviceByPath(path) {
        return this.getAllDevices().find(d => d.getUniquePath() === path);
    }
    getDeviceByStaticState(state) {
        const deviceId = state.split('@')[1].split(':')[0];
        return this.getAllDevices().find(d => { var _a; return ((_a = d.features) === null || _a === void 0 ? void 0 : _a.device_id) === deviceId; });
    }
    transportType() {
        return this.transport.name;
    }
    getTransportInfo() {
        return {
            type: this.transportType(),
            version: this.transport.version,
            outdated: this.transport.isOutdated,
        };
    }
    dispose() {
        this.removeAllListeners();
        return this.cleanup();
    }
    async cleanup() {
        var _a;
        const { transport } = this;
        const devices = this.getAllDevices();
        this.transport = undefined;
        this.authPenaltyManager.clear();
        (0, utils_2.typedObjectKeys)(this.devices).forEach(key => delete this.devices[key]);
        (_a = this.rejectPending) === null || _a === void 0 ? void 0 : _a.call(this, new Error('Disposed'));
        devices.forEach(device => {
            this.emit(events_1.DEVICE.DISCONNECT, device.toMessageObject());
        });
        await Promise.all(devices.map(device => device.dispose()));
        transport === null || transport === void 0 ? void 0 : transport.stop();
    }
    async enumerate(transport = this.transport) {
        const res = await transport.enumerate();
        if (!res.success) {
            return;
        }
        res.payload.forEach(d => {
            var _a;
            (_a = this.devices[d.path]) === null || _a === void 0 ? void 0 : _a.updateDescriptor(d);
        });
    }
    addAuthPenalty(device) {
        return this.authPenaltyManager.add(device);
    }
    removeAuthPenalty(device) {
        return this.authPenaltyManager.remove(device);
    }
}
exports.DeviceList = DeviceList;
//# sourceMappingURL=DeviceList.js.map