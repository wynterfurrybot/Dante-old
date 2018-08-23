const config = require ('./config.js');
const token = config.token;
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function tryCommand(msg) {
  //if (msg)
}

client.on('message', msg => {
  //if (!tryComm)
});

client.login(token);
