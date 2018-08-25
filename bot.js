const config = require ('./config.js');
const Discord = require('discord.js');
const mysql = require('mysql');
const client = new Discord.Client();

function log(x) {
  if (config.logging) {
    console.log('LOG | ' + x);
  }
}

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
});

var database = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});

database.connect(function (err) {
    if (err) {
        console.error('ERROR: Could not connect to database! '+ err);

        return;
    }

    console.log('Database: Connection secured!');
});

var cmds = {};

config.cmdSources.forEach(file => {
  var cmdModule = require(file);

  var addCmdsFunc = cmdModule.addCmds;
  if (addCmdsFunc !== undefined) {
    // Module adds commands
    addCmdsFunc(cmds);
  }

  var addEventsFunc = cmdModule.addEvents;
  if (addEventsFunc !== undefined) {
    // Module adds events
    addEventsFunc({
      'client': client,
      'database': database,
      'logging': config.logging,
      'config': config
    });
  }
});

log('Found commands: ' + cmds);

function tryCommand(msg) {
  var msgContent = msg.content;
  if (msgContent.length <= config.prefix) {
    // Too short to be a command
    log(`${msgContent} failed because it's too short`);
    return false;
  }

  if (msgContent.slice(0, config.prefix.length) !== config.prefix) {
    // Doesn't start with prefix
    log(`${msgContent} failed because the prefix didn't match.`);
    return false;
  }

  var cmd = msgContent.slice(config.prefix.length).split(' ')[0];
  var cmdFunction = cmds[cmd];

  if (cmdFunction === undefined) {
    // Command wasn't found
    log(`${msgContent} failed because the command wasn't found.`);
    return false;
  }

  cmdFunction({
    msg: msg,
    args: msgContent.slice(config.prefix.length + cmd.length)
  });

  log(`${msgContent} succeded.`)
  msg.delete();
  return true;
}

client.on('message', msg => {
  if(msg.author.bot){return;}
  tryCommand(msg);
});

client.login(config.token);
