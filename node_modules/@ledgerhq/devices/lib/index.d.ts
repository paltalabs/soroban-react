/**
 * The USB product IDs will be defined as MMII, encoding a model (MM) and an interface bitfield (II)
 *
 ** Model
 * Ledger Nano S : 0x10
 * Ledger Blue : 0x00
 * Ledger Nano X : 0x40
 *
 ** Interface support bitfield
 * Generic HID : 0x01
 * Keyboard HID : 0x02
 * U2F : 0x04
 * CCID : 0x08
 * WebUSB : 0x10
 */
export declare const IIGenericHID = 1;
export declare const IIKeyboardHID = 2;
export declare const IIU2F = 4;
export declare const IICCID = 8;
export declare const IIWebUSB = 16;
export declare enum DeviceModelId {
    /** Ledger Blue */
    blue = "blue",
    /** Ledger Nano S */
    nanoS = "nanoS",
    /** Ledger Nano S Plus */
    nanoSP = "nanoSP",
    /** Ledger Nano X */
    nanoX = "nanoX",
    /** Ledger Stax */
    stax = "stax",
    /** Ledger Flex ("europa" is the internal name) */
    europa = "europa"
}
/**
 *
 */
export declare const ledgerUSBVendorId = 11415;
/**
 *
 */
export declare const getDeviceModel: (id: DeviceModelId) => DeviceModel;
/**
 * Given a `targetId`, return the deviceModel associated to it,
 * based on the first two bytes.
 */
export declare const identifyTargetId: (targetId: number) => DeviceModel | null | undefined;
/**
 * From a given USB product id, return the deviceModel associated to it.
 *
 * The mapping from the product id is only based on the 2 most significant bytes.
 * For example, Stax is defined with a product id of 0x60ii, a product id 0x6011 would be mapped to it.
 */
export declare const identifyUSBProductId: (usbProductId: number) => DeviceModel | null | undefined;
export declare const identifyProductName: (productName: string) => DeviceModel | null | undefined;
/**
 *
 */
export declare const getBluetoothServiceUuids: () => string[];
/**
 *
 */
export declare const getInfosForServiceUuid: (uuid: string) => BluetoothInfos | undefined;
/**
 *
 */
export interface DeviceModel {
    id: DeviceModelId;
    productName: string;
    productIdMM: number;
    legacyUsbProductId: number;
    usbOnly: boolean;
    memorySize: number;
    masks: number[];
    getBlockSize: (firmwareVersion: string) => number;
    bluetoothSpec?: {
        serviceUuid: string;
        writeUuid: string;
        writeCmdUuid: string;
        notifyUuid: string;
    }[];
}
/**
 *
 */
export interface BluetoothInfos {
    deviceModel: DeviceModel;
    serviceUuid: string;
    writeUuid: string;
    writeCmdUuid: string;
    notifyUuid: string;
}
//# sourceMappingURL=index.d.ts.map