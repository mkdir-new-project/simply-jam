interface consoleArgs {
    log: Parameters<typeof console['log']>,
    error: Parameters<typeof console['error']>,
    info: Parameters<typeof console['info']>,
    warn: Parameters<typeof console['warn']>
}

class Logger {

    static DEV = false;
    static log(..._: consoleArgs['log']) {
        if (!Logger.DEV) return;
        console.log.apply(this, arguments as any);
    }

    static error(..._: consoleArgs['error']) {
        if (!Logger.DEV) return;
        console.error.apply(this, arguments as any);
    }

    static warn(..._: consoleArgs['warn']) {
        if (!Logger.DEV) return;
        console.warn.apply(this, arguments as any);
    }

    static info(..._: consoleArgs['info']) {
        if (!Logger.DEV) return;
        console.info.apply(this, arguments as any);
    }

    static debug(..._args: any[]) {
        if (!Logger.DEV) return;
        console.debug.apply(this, arguments as any);
    }
}

export default Logger;