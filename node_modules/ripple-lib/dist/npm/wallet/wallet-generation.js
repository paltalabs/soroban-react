"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFaucetUrl = exports.FaucetNetwork = void 0;
const https = require("https");
const common_1 = require("../common");
const schema_validator_1 = require("../common/schema-validator");
const errors_1 = require("../common/errors");
var FaucetNetwork;
(function (FaucetNetwork) {
    FaucetNetwork["Testnet"] = "faucet.altnet.rippletest.net";
    FaucetNetwork["Devnet"] = "faucet.devnet.rippletest.net";
})(FaucetNetwork = exports.FaucetNetwork || (exports.FaucetNetwork = {}));
const INTERVAL_SECONDS = 1;
const MAX_ATTEMPTS = 20;
function generateFaucetWallet(address) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isConnected())
            throw new errors_1.RippledError("RippleAPI not connected, cannot call faucet");
        let body;
        let startingBalance = 0;
        let faucetUrl = getFaucetUrl(this);
        if (address && schema_validator_1.isValidAddress(address)) {
            body = new TextEncoder().encode(JSON.stringify({
                destination: address
            }));
            const addressToFundBalance = yield getAddressXrpBalance(this, address);
            if (addressToFundBalance && !isNaN(+addressToFundBalance)) {
                startingBalance = +addressToFundBalance;
            }
            else {
                startingBalance = 0;
            }
        }
        const options = {
            hostname: faucetUrl,
            port: 443,
            path: '/accounts',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body ? body.length : 0
            }
        };
        return new Promise((resolve, reject) => {
            const request = https.request(options, (response) => {
                const chunks = [];
                response.on('data', (d) => {
                    chunks.push(d);
                });
                response.on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const body = Buffer.concat(chunks).toString();
                    if (response.headers['content-type'].startsWith('application/json')) {
                        const wallet = JSON.parse(body);
                        const classicAddress = wallet.account.classicAddress;
                        if (classicAddress) {
                            try {
                                const isFunded = yield hasAddressBalanceIncreased(this, classicAddress, startingBalance);
                                if (isFunded) {
                                    resolve(wallet);
                                }
                                else {
                                    reject(new common_1.errors.XRPLFaucetError(`Unable to fund address with faucet after waiting ${INTERVAL_SECONDS * MAX_ATTEMPTS} seconds`));
                                }
                            }
                            catch (err) {
                                reject(new common_1.errors.XRPLFaucetError(err));
                            }
                        }
                        else {
                            reject(new common_1.errors.XRPLFaucetError(`The faucet account classic address is undefined`));
                        }
                    }
                    else {
                        reject({
                            statusCode: response.statusCode,
                            contentType: response.headers['content-type'],
                            body
                        });
                    }
                }));
            });
            request.write(body ? body : '');
            request.on('error', (error) => {
                reject(error);
            });
            request.end();
        });
    });
}
function getAddressXrpBalance(api, address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const balances = yield api.getBalances(address);
            const xrpBalance = balances.filter((balance) => balance.currency.toUpperCase() === 'XRP');
            return xrpBalance[0].value;
        }
        catch (err) {
            return `Unable to retrieve ${address} balance. Error: ${err}`;
        }
    });
}
function hasAddressBalanceIncreased(api, address, originalBalance) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            let attempts = MAX_ATTEMPTS;
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (attempts < 0) {
                    clearInterval(interval);
                    resolve(false);
                }
                else {
                    attempts--;
                }
                try {
                    const newBalance = +(yield getAddressXrpBalance(api, address));
                    if (newBalance > originalBalance) {
                        clearInterval(interval);
                        resolve(true);
                    }
                }
                catch (err) {
                    clearInterval(interval);
                    reject(new common_1.errors.XRPLFaucetError(`Unable to check if the address ${address} balance has increased. Error: ${err}`));
                }
            }), INTERVAL_SECONDS * 1000);
        });
    });
}
function getFaucetUrl(api) {
    const connectionUrl = api.connection.getUrl();
    if (connectionUrl.includes('altnet') || connectionUrl.includes('testnet')) {
        return FaucetNetwork.Testnet;
    }
    if (connectionUrl.includes('devnet')) {
        return FaucetNetwork.Devnet;
    }
    return undefined;
}
exports.getFaucetUrl = getFaucetUrl;
exports.default = generateFaucetWallet;
//# sourceMappingURL=wallet-generation.js.map