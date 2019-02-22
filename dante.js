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

var config;

function loadConfig() {
  console.log('Loading config...');
  config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
  console.log('Done. Read config.');
}

loadConfig();

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

function insertVariables(x, variables) {
  Object.keys(variables).forEach(name => {
    x = x.replace(new RegExp(`\\\$${name}`, "g"), variables[name]);
  });
  return x;
}

function getEmbed(json, variables) {
  var embed = new Discord.MessageEmbed()
    .setTitle(insertVariables(json.title, variables))
    .setFooter(insertVariables(json.footer, variables))
    .setColor(json.colour);
  json.fields.forEach(field => {
    embed.addField(insertVariables(field.prefix, variables), insertVariables(field.message, variables), field.inline == undefined ? (json.inline == undefined ? false : true) : field.inline);
  });
  return embed;
}

function loadModules(x) {
  if (enabled.length != 0) enabled[enabled.length - 1] = false;
  enabled.push(true);
  fs.readdirSync('./modules').forEach(file => {
    console.log(`Reading module ${file}.`)
    delete require.cache[require.resolve(`./modules/${file}`)];
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
        client: client,
        database: database,
        logging: config.logging,
        config: config,
        log: log,
        on: onWrapper,
        reloadFunc: reload,
        insertVariables: insertVariables,
        getEmbed: getEmbed
      });
    }
  });
}

var cmds = {};
loadModules(cmds);

function reload() {
  loadConfig();
  cmds = {};
  loadModules(cmds);
}

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
  var msgContent = msg.content.toLowerCase();
  
    if(msgContent.includes("grabify.link"))
  {
    if (msg.guild != null) msg.delete();
	msg.guild.fetchMember(msg.author).then(usr => usr.ban());
    msg.reply("Automatically banned.");
    return;
  }

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

  if(msgContent.includes("@everyone") || msgContent.includes("@here"))
  {
    if (msg.guild != null) msg.delete();
    msg.reply("For the server's safety, I cannot mention everyone. My apologies.");
    return;
  }
  


  cmdFunction({
    client: client,
    msg: msg,
    args: msg.content.slice(config.prefix.length + cmd.length + 1),
    config: config,
    database: database,
    log: log,
    on: onWrapper,
    reloadFunc: reload,
    isFromGuild: msg.guild != null,
    insertVariables: insertVariables,
    getEmbed: getEmbed
  });

  log(`${msgContent} succeded.`);
  // Insert tracking here
  if (msg.guild != null) msg.delete();
  return true;
}

client.on('message', msg => {
  if (msg.author.bot) return;
  tryCommand(msg);
});

client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.messages.fetch(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

client.login(config.token);
