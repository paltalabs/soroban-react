"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discovery = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const constants_1 = require("../../constants");
const accountUtils_1 = require("../../utils/accountUtils");
const formatUtils_1 = require("../../utils/formatUtils");
class Discovery extends events_1.default {
    constructor(options) {
        super();
        this.types = [];
        this.accounts = [];
        this.index = 0;
        this.typeIndex = 0;
        this.interrupted = false;
        this.completed = false;
        this.blockchain = options.blockchain;
        this.commands = options.commands;
        this.coinInfo = options.blockchain.coinInfo;
        this.derivationType = options.derivationType;
        const { coinInfo } = this;
        if (coinInfo.type === 'bitcoin') {
            const getDescriptor = (purpose, index) => (0, accountUtils_1.getAccountAddressN)(coinInfo, index, { purpose });
            if (coinInfo.xPubMagicSegwitNative) {
                this.types.push({
                    type: 'p2wpkh',
                    getPath: getDescriptor.bind(this, 84),
                });
            }
            if (coinInfo.xPubMagicSegwit) {
                this.types.push({
                    type: 'p2sh',
                    getPath: getDescriptor.bind(this, 49),
                });
            }
            this.types.push({
                type: 'p2pkh',
                getPath: getDescriptor.bind(this, 44),
            });
        }
        else {
            this.types.push({
                type: 'p2pkh',
                getPath: accountUtils_1.getAccountAddressN.bind(this, coinInfo),
            });
        }
    }
    async start(details) {
        const limit = 10;
        this.interrupted = false;
        while (!this.completed && !this.interrupted) {
            const accountType = this.types[this.typeIndex];
            const label = `Account #${this.index + 1}`;
            const overTheLimit = this.index >= limit;
            const path = accountType.getPath(this.index);
            const descriptor = await this.commands.getAccountDescriptor(this.coinInfo, path, this.derivationType);
            if (!descriptor) {
                throw constants_1.ERRORS.TypedError('Runtime', 'Discovery: descriptor not found');
            }
            if (this.interrupted)
                return;
            const account = {
                ...descriptor,
                type: accountType.type,
                label,
            };
            this.accounts = this.accounts.filter(a => a.descriptor !== account.descriptor);
            if (!overTheLimit) {
                this.accounts.push(account);
                this.emit('progress', this.accounts);
            }
            const info = await this.blockchain.getAccountInfo({
                descriptor: account.descriptor,
                details,
            });
            if (this.interrupted)
                return;
            this.accounts = this.accounts.filter(a => a.descriptor !== account.descriptor);
            if (!overTheLimit || (overTheLimit && !info.empty)) {
                const balance = (0, formatUtils_1.formatAmount)(info.availableBalance, this.coinInfo);
                this.accounts.push({
                    ...account,
                    empty: info.empty,
                    balance,
                    addresses: info.addresses,
                });
                this.emit('progress', this.accounts);
            }
            if (info.empty) {
                if (this.typeIndex + 1 < this.types.length) {
                    this.typeIndex++;
                    this.index = 0;
                }
                else {
                    this.emit('complete');
                    this.completed = true;
                }
            }
            else {
                this.index++;
            }
        }
    }
    stop() {
        this.interrupted = !this.completed;
    }
    dispose() {
        this.accounts = [];
    }
}
exports.Discovery = Discovery;
//# sourceMappingURL=Discovery.js.map