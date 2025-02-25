import { UiPromiseCreator, UiPromiseResponse } from '../events';
import { DeviceUniquePath } from '../types/device';
export declare const createUiPromiseManager: (interactionTimeout: () => void) => {
    exists: (type: UiPromiseResponse["type"]) => boolean;
    create: UiPromiseCreator;
    resolve: (event: UiPromiseResponse) => boolean;
    rejectAll: (error: Error) => void;
    disconnected: (devicePath: DeviceUniquePath) => boolean;
    get: <T extends UiPromiseResponse["type"]>(type: T) => Promise<Extract<import("../events").UiResponsePopupHandshake, {
        type: T;
    }> | Extract<import("../events").UiResponsePermission, {
        type: T;
    }> | Extract<import("../events").UiResponseConfirmation, {
        type: T;
    }> | Extract<import("../events").UiResponseDevice, {
        type: T;
    }> | Extract<import("../events").UiResponsePin, {
        type: T;
    }> | Extract<import("../events").UiResponseWord, {
        type: T;
    }> | Extract<import("../events").UiResponsePassphrase, {
        type: T;
    }> | Extract<import("../events").UiResponsePassphraseAction, {
        type: T;
    }> | Extract<import("../events").UiResponseAccount, {
        type: T;
    }> | Extract<import("../events").UiResponseFee, {
        type: T;
    }> | Extract<import("../events").UiResponseLoginChallenge, {
        type: T;
    }> | Extract<{
        type: "device-disconnect";
        payload?: undefined;
    }, {
        type: T;
    }>>;
    clear: () => void;
};
//# sourceMappingURL=uiPromiseManager.d.ts.map