const fs = require('fs');
const Discord = require('discord.js');
const mysql = require('mysql');
const client = new Discord.Client();
const readline = require('readline');

var enabled = [];

function onWrapper(eventName, eventFunc) {
  var id = enabled.length - 1;
  
  client.on(eventName, (a, b, c, d) => {
    if (enabled[id]) {
      eventFunc(a, b, c, d);
    }
  });
}

console.log('Loading config...');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
console.log('Done. Read config.');

async function log(x) {
  if (config.logging) {
    console.log('LOG | ' + x);
  }
}

client.on('ready', () => {
  log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`over ${client.guilds.size} servers | !help`, { type: 'WATCHING' });
});

var database = mysql.createConnection({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.id
});

database.connect(err => {
  if (err) {
    console.error('ERROR: Could not connect to database! '+ err);
    return;
  }

  console.log('Database: Connection secured!');
});

function loadModules(x) {
  if (enabled.length != 0) enabled[enabled.length - 1] = false;
  enabled.push(true);
  fs.readdirSync('./modules').forEach(file => {
    var cmdModule = require(`./modules/${file}`);

    var addCmdsFunc = cmdModule.addCmds;
    if (addCmdsFunc !== undefined) {
      // Module adds commands
      addCmdsFunc(x);
    }

    var addEventsFunc = cmdModule.addEvents;
    if (addEventsFunc !== undefined) {
      // Module adds events
      addEventsFunc({
        'client': client,
        'database': database,
        'logging': config.logging,
        'config': config,
        'log': log
      });
    }
  });
}

var cmds = {};
loadModules(cmds);

readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
}).on('line', line => {
  if (line == 'reload') {
    loadModules(cmds);
  }
});

log('Found commands: ' + cmds);

async function tryCommand(msg) {
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
    args: msgContent.slice(config.prefix.length + cmd.length + 1),
    config: config,
    database: database,
    log: log
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
