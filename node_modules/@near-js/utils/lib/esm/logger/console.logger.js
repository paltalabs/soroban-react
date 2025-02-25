export class ConsoleLogger {
    logLevels;
    constructor(logLevels) {
        this.logLevels = logLevels;
    }
    isLevelEnabled = (level) => {
        return this.logLevels.includes(level);
    };
    print(level, message, ...optionalParams) {
        switch (level) {
            case 'error':
            case 'fatal':
                return console.error(message, ...optionalParams);
            case 'warn':
                return console.warn(message, ...optionalParams);
            case 'log':
                return console.log(message, ...optionalParams);
            case 'debug':
            case 'verbose':
                return console.debug(message, ...optionalParams);
        }
    }
    verbose(message, ...optionalParams) {
        if (!this.isLevelEnabled('verbose'))
            return;
        this.print('verbose', message, ...optionalParams);
    }
    debug(message, ...optionalParams) {
        if (!this.isLevelEnabled('debug'))
            return;
        this.print('debug', message, ...optionalParams);
    }
    log(message, ...optionalParams) {
        if (!this.isLevelEnabled('log'))
            return;
        this.print('log', message, ...optionalParams);
    }
    warn(message, ...optionalParams) {
        if (!this.isLevelEnabled('warn'))
            return;
        this.print('warn', message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        if (!this.isLevelEnabled('error'))
            return;
        this.print('error', message, ...optionalParams);
    }
    fatal(message, ...optionalParams) {
        if (!this.isLevelEnabled('fatal'))
            return;
        this.print('fatal', message, ...optionalParams);
    }
}
