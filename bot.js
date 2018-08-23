const config = require ('./config.js');
const Discord = require('discord.js');
const client = new Discord.Client();

function log(x) {
  if (config.logging) {
    console.log('LOG | ' + x);
  }
}

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
});

var cmds = {};

config.cmdSources.forEach(file => {
  var cmdModule = require(file);
  cmdModule.addCmds(cmds);
});

log('Found commands: ' + cmds);
log(`cmds['debug'] == ${cmds['debug']}`);

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
  log()

  tryCommand(msg);
});

client.login(config.token);
