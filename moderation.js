function warn(x){
  x.msg.channel.send("Test");
}

function addCmds(x) {
  x['warn'] = warn;
}


module.exports = {
  addCmds: addCmds
};
