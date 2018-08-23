
function debug(x) {
    x.msg.reply(x.args);
}

function addCmds(x) {
    x['debug'] = debug;
}

module.exports = {
    addCmds: addCmds
};
