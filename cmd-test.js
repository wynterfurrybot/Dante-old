
function debug(x) {
    x.msg.reply(x.args);
}

function hug(x){
    x.msg.channel.send("<@" + x.msg.author.id + "> *walks upto *" + x.args + "* sneakily, when they aren't looking, pouncing them from behind and trapping them in a big hug!*");
}

function addCmds(x) {
    x['debug'] = debug;
    x['hug'] = hug;
}

module.exports = {
    addCmds: addCmds
};
