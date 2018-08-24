
function debug(x) {
    x.msg.reply(x.args);
}

function hug(x){
x.msg.send(x.args);
}

function addCmds(x) {
    x['debug'] = debug;
    x['hug'] = hug;
}

module.exports = {
    addCmds: addCmds
};
