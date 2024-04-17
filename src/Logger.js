const { stdout } = require('process');
const { format } = require('util');

const color = {
    a: '\x1b[32m',
    b: '\x1b[36m',
    black: '\x1b[30m',
    blue: '\x1b[34m',
    c: '\x1b[31m',
    d: '\x1b[35m',
    e: '\x1b[33m',
    f: '\x1b[37m',
    r: '\x1b[39m',
};

/**
 * @param {string} info
 */
module.exports.info = (info) => {
    stdout.write(getTimestamp() + color.a + ' [INFO] ' + color.r + info + '\n');
};

/**
 * @param {string} warn
 */
module.exports.warn = (warn) => {
    stdout.write(getTimestamp() + color.e + ' [WARN] ' + color.r + warn + '\n');
};

/**
 * @param {string} error
 */
module.exports.error = (error) => {
    stdout.write(getTimestamp() + color.c + ' [ERROR] ' + color.r + error + '\n');
};

/**
 * @param {string} debug
 */
module.exports.debug = (debug) => {
    stdout.write(getTimestamp() + color.blue + ' [DEBUG] ' + color.r + debug + '\n');
};

function getTimestamp() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    return format('%s[%d:%d:%d]%s', color.f, hour, min, sec, color.r);
}
