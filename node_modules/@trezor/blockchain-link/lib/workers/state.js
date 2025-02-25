"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerState = void 0;
const errors_1 = require("@trezor/blockchain-link-types/lib/constants/errors");
class WorkerState {
    constructor() {
        this.addresses = [];
        this.accounts = [];
        this.subscription = {};
    }
    validateAddresses(addr) {
        if (!Array.isArray(addr))
            throw new errors_1.CustomError('invalid_param', '+addresses');
        const seen = [];
        return addr.filter(a => {
            if (typeof a !== 'string')
                return false;
            if (seen.indexOf(a) >= 0)
                return false;
            seen.push(a);
            return true;
        });
    }
    addAddresses(addr) {
        const unique = this.validateAddresses(addr).filter(a => this.addresses.indexOf(a) < 0);
        this.addresses = this.addresses.concat(unique);
        return unique;
    }
    getAddresses() {
        return this.addresses;
    }
    removeAddresses(addr) {
        const unique = this.validateAddresses(addr);
        this.addresses = this.addresses.filter(a => unique.indexOf(a) < 0);
        return this.addresses;
    }
    validateAccounts(acc) {
        if (!Array.isArray(acc))
            throw new errors_1.CustomError('invalid_param', '+accounts');
        const seen = [];
        return acc.filter(a => {
            if (a && typeof a === 'object' && typeof a.descriptor === 'string') {
                if (seen.indexOf(a.descriptor) >= 0)
                    return false;
                seen.push(a.descriptor);
                return true;
            }
            return false;
        });
    }
    getAccountAddresses(acc) {
        if (acc.addresses) {
            const { change, used, unused } = acc.addresses;
            return change.concat(used, unused).map(a => a.address);
        }
        return [acc.descriptor];
    }
    addAccounts(acc) {
        const valid = this.validateAccounts(acc);
        const others = this.accounts.filter(a => !valid.find(b => b.descriptor === a.descriptor));
        this.accounts = others.concat(valid);
        const addresses = this.accounts.reduce((addr, a) => addr.concat(this.getAccountAddresses(a)), []);
        this.addAddresses(addresses);
        return valid;
    }
    getAccount(address) {
        return this.accounts.find(a => {
            if (a.descriptor === address)
                return true;
            if (a.addresses) {
                const { change, used, unused } = a.addresses;
                if (change.find(ad => ad.address === address))
                    return true;
                if (used.find(ad => ad.address === address))
                    return true;
                if (unused.find(ad => ad.address === address))
                    return true;
            }
            return false;
        });
    }
    getAccounts() {
        return this.accounts;
    }
    removeAccounts(acc) {
        const valid = this.validateAccounts(acc);
        const accountsToRemove = this.accounts.filter(a => valid.find(b => b.descriptor === a.descriptor));
        const addressesToRemove = accountsToRemove.reduce((addr, acc) => addr.concat(this.getAccountAddresses(acc)), []);
        this.accounts = this.accounts.filter(a => accountsToRemove.indexOf(a) < 0);
        this.removeAddresses(addressesToRemove);
        return this.accounts;
    }
    addSubscription(type, id = true) {
        this.subscription[type] = id;
    }
    getSubscription(type) {
        return this.subscription[type];
    }
    hasSubscriptions() {
        return Object.keys(this.subscription).length > 0;
    }
    removeSubscription(type) {
        delete this.subscription[type];
    }
    clearSubscriptions() {
        Object.keys(this.subscription).forEach(key => {
            delete this.subscription[key];
        });
    }
    removeEmpty(obj) {
        Object.keys(obj).forEach(key => {
            if (Array.isArray(obj[key]))
                obj[key].map((o) => this.removeEmpty(o));
            if (obj[key] && typeof obj[key] === 'object')
                this.removeEmpty(obj[key]);
            else if (obj[key] === undefined)
                delete obj[key];
        });
        return obj;
    }
    cleanup() {
        this.removeAccounts(this.getAccounts());
        this.removeAddresses(this.getAddresses());
        this.clearSubscriptions();
    }
}
exports.WorkerState = WorkerState;
//# sourceMappingURL=state.js.map