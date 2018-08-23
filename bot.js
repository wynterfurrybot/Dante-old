const config = require ('./config.js');
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var cmds = {};

config['cmd-sources'].array.forEach(file => {
  var cmdModule = require(file);
  cmdModule.addCmds(cmds);
});

function tryCommand(msg) {
  var msgContent = msg.content;
  if (msgContent.length <= config.prefix) {
    // Too short to be a command
    return false;
  }

  if (msgContent.slice(config.prefix.length) !== config.prefix) {
    // Doesn't start with prefix
    return false;
  }

  var cmd = msgContent.slice(config.prefix.length).split(' ')[0];
  var cmdFunction = cmds[cmd];

  if (cmdFunction === undefined) {
    // Command wasn't found
    return false;
  }

  cmdFunction({
    msg: msg,
    args: msgContent.slice(config.prefix.length + cmd.length)
  });

  return true;
}

client.on('message', msg => {
  tryCommand(msg);
});

client.login(config.token);
