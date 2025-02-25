const myFormat = ({ level, args, label, timestamp, }) => {
    if (timestamp) {
        return [`${timestamp} [${label}] ${level}:`, ...args];
    }
    return [`[${label}] ${level}:`, ...args];
};
export const getLogger = (debug) => {
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
