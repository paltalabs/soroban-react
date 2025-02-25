import { AbstractTransport, AbstractTransportParams } from './abstract';
export declare class WebUsbTransport extends AbstractTransport {
    name: "WebUsbTransport";
    apiType: "usb";
    constructor(params: AbstractTransportParams);
    init: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    acquire: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    enumerate: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    call: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    receive: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    send: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    release: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    stop: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    releaseDevice: () => Promise<{
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    }>;
    listen: () => {
        success: false;
        error: "This transport can not be used in this environment";
        message: string | undefined;
    };
}
//# sourceMappingURL=webusb.d.ts.map