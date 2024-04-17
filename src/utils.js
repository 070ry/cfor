const { error } = require('./Logger');

module.exports.del = async (message) => {
    if (!message.deletable) return false;
    message.delete().catch((e) => {
        error(`Failed to delete message: ${e}`);
    });
    return true;
};

module.exports.checkPermission = async (member, permission) => {
    if (member.permissions.has(permission)) return true;
    return false;
};

module.exports.XSS = (str) => {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};
