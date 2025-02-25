"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const myFormat = ({ level, args, label, timestamp, }) => {
    if (timestamp) {
        return [`${timestamp} [${label}] ${level}:`, ...args];
    }
    return [`[${label}] ${level}:`, ...args];
};
const getLogger = (debug) => {
    const label = '@fivebinaries/coin-selection';
    return {
        debug: (...args) => {
            if (!debug)
                return;
            const formattedMessage = myFormat({
                level: 'DEBUG',
                args: args,
                // timestamp: new Date().toISOString(),
                timestamp: undefined,
                label,
            });
            console.log(...formattedMessage);
        },
    };
};
exports.getLogger = getLogger;
