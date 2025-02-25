import { TypedEmitter } from '@trezor/utils';
export interface Permission {
    type: string;
    device?: string;
}
export interface PreferredDevice {
    label?: string;
    path: string & {
        __type: 'DeviceUniquePath';
    };
    state?: `${string}@${string}:${number}`;
    internalState?: string;
    internalStateExpiration?: number;
    instance?: number;
}
export interface OriginBoundState {
    permissions?: Permission[];
    preferredDevice?: PreferredDevice;
}
export interface GlobalState {
    tracking_enabled?: boolean;
    tracking_id?: string;
    browser?: boolean;
}
export type Store = GlobalState & {
    origin: {
        [origin: string]: OriginBoundState;
    };
};
type GetNewStateCallback = (currentState: Store) => Store;
type GetNewOriginBoundStateStateCallback = (currentState: OriginBoundState) => OriginBoundState;
interface Events {
    changed: Store;
}
declare class Storage extends TypedEmitter<Events> {
    save(getNewState: GetNewStateCallback, temporary?: boolean): void;
    saveForOrigin(getNewState: GetNewOriginBoundStateStateCallback, origin: string, temporary?: boolean): void;
    load(temporary?: boolean): Store;
    loadForOrigin(origin: string, temporary?: boolean): OriginBoundState;
}
declare const storage: Storage;
export { storage };
//# sourceMappingURL=storage.d.ts.map