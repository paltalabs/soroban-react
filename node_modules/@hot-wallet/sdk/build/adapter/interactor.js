export const InjectedHOT = {
    connection: new Promise(() => { }),
    get isInjected() {
        const domains = ["http://localhost:1234", "https://my.herewallet.app", "https://beta.herewallet.app"];
        return domains.includes(window.location.ancestorOrigins[0]);
    },
    request(method, request) {
        return new Promise((resolve, reject) => {
            const id = crypto.randomUUID();
            const handler = (e) => {
                if (e.data.id !== id)
                    return;
                window === null || window === void 0 ? void 0 : window.removeEventListener("message", handler);
                if (e.data.success)
                    return resolve(e.data.payload);
                else
                    return reject(e.data.payload);
            };
            console.log("IFRAME", { hot: true, method, request, id });
            window === null || window === void 0 ? void 0 : window.parent.postMessage({ $hot: true, method, request, id }, "*");
            window === null || window === void 0 ? void 0 : window.addEventListener("message", handler);
        });
    },
};
InjectedHOT.connection = new Promise((resolve) => {
    if (typeof window === "undefined")
        return resolve(null);
    if ((window === null || window === void 0 ? void 0 : window.self) === (window === null || window === void 0 ? void 0 : window.top))
        return resolve(null);
    InjectedHOT.request("initialized", {})
        .then(resolve)
        .catch(() => resolve(null));
});
//# sourceMappingURL=interactor.js.map