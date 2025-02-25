"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyEventEmitter = void 0;
class ProxyEventEmitter {
    constructor(eventEmitters) {
        this.eventEmitters = eventEmitters;
    }
    emit(eventName, ...args) {
        this.eventEmitters.forEach(emitter => emitter.emit(eventName, ...args));
        return true;
    }
    on(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.on(eventName, listener));
        return this;
    }
    off(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.off(eventName, listener));
        return this;
    }
    once(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.once(eventName, listener));
        return this;
    }
    addListener(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.addListener(eventName, listener));
        return this;
    }
    prependListener(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.prependListener(eventName, listener));
        return this;
    }
    prependOnceListener(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.prependOnceListener(eventName, listener));
        return this;
    }
    removeAllListeners(event) {
        this.eventEmitters.forEach(emitter => emitter.removeAllListeners(event));
        return this;
    }
    removeListener(eventName, listener) {
        this.eventEmitters.forEach(emitter => emitter.removeListener(eventName, listener));
        return this;
    }
    setMaxListeners(n) {
        this.eventEmitters.forEach(emitter => emitter.setMaxListeners(n));
        return this;
    }
    eventNames() {
        return this.eventEmitters[0].eventNames();
    }
    getMaxListeners() {
        return this.eventEmitters[0].getMaxListeners();
    }
    listenerCount(eventName, listener) {
        return this.eventEmitters[0].listenerCount(eventName, listener);
    }
    rawListeners(eventName) {
        return this.eventEmitters[0].rawListeners(eventName);
    }
    listeners(eventName) {
        return this.eventEmitters[0].listeners(eventName);
    }
}
exports.ProxyEventEmitter = ProxyEventEmitter;
//# sourceMappingURL=proxy-event-emitter.js.map