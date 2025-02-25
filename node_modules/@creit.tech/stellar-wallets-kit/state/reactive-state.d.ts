import { ReactiveController, ReactiveControllerHost } from 'lit';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
export declare class ReactiveState<T> implements ReactiveController {
    private host;
    private source;
    value?: T | undefined;
    sub: Subscription | null;
    value$: BehaviorSubject<T | undefined>;
    constructor(host: ReactiveControllerHost, source: Observable<T>, value?: T | undefined);
    hostConnected(): void;
    hostDisconnected(): void;
}
//# sourceMappingURL=reactive-state.d.ts.map