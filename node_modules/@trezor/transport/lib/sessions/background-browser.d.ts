import type { Descriptor } from '../types';
import { HandleMessageParams, HandleMessageResponse, SessionsBackgroundInterface } from './types';
export declare class BrowserSessionsBackground implements SessionsBackgroundInterface {
    private readonly background;
    constructor(sessionsBackgroundUrl: string);
    handleMessage<M extends HandleMessageParams>(params: M): Promise<HandleMessageResponse<M>>;
    on(event: 'descriptors', listener: (descriptors: Descriptor[]) => void): void;
    on(event: 'releaseRequest', listener: (descriptor: Descriptor) => void): void;
    dispose(): void;
}
//# sourceMappingURL=background-browser.d.ts.map