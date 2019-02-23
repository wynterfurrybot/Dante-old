
/* Commands specific to developors.
* Do not use as you will not be allowed
*/

const Discord = require('discord.js');

function hasPermission(x, usrId) {
  x.log('checking permission');
  var isPermitted = false;
  x.config.botModerators.forEach(id => {
    x.log(`${id} == ${usrId}, ${id == usrId}`);
    if (id == usrId) {
      isPermitted = true;
    }
  });
  return isPermitted;
}

function reload(x) {
  if (!x.isFromGuild) return;
  if (hasPermission(x, x.msg.author.id)) {
    x.log('Permission granted. Reloading...');
    x.reloadFunc();
    x.log('Reloaded.');
  }
}



function servers(x) {
  if (!x.isFromGuild) return;
  if (hasPermission(x, x.msg.author.id)) {
    var guilds = x.client.guilds.array();
    var list = "";
    guilds.forEach(g => {
      list = list + g.name + '\n';
    });
    var embed = new Discord.MessageEmbed()
      .setTitle("Guild list")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor('#FF0000')
      .setDescription(list)
      .setFooter(`${x.client.guilds.size} servers | Dantè Beta`)
      .setTimestamp();
    x.msg.channel.send({embed});
  }
}

function ping(x) {
  var ping =  Math.round(x.client.ws.ping) + ' ms';
  var embed = new Discord.MessageEmbed()
    .setTitle("Current Ping")
    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor('#FF0000')
    .setDescription(ping)
    .setFooter(`Pong! | Dantè Beta`)
    .setTimestamp();
  x.msg.channel.send({embed});
}


function bugreport(x) {
  // We need as much info here as possible.
  
  var channel = x.msg.channel;
  var server = x.msg.guild.name + " (" + x.msg.guild.id + ")";
  
 
  
  var embed = new Discord.MessageEmbed()
    .setTitle("Bug report")
    .setAuthor(x.msg.author.username + "#" + x.msg.author.discriminator, x.msg.author.avatarURL)
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor('#FF0000')
    .setDescription("New bug report! \nDetails: \n\n" + x.args)
    .setFooter("BUG FOUND! | Dantè Beta |" + server)
    .setTimestamp();
 
 x.client.channels.fetch("483990346838310923").then(function (ch)
					{
						ch.send("<@512608629992456192>", {embed});
					
					})
}

function rebuildGuilds(x) {
  if (!x.isFromGuild) return;
  if (hasPermission(x, x.msg.author.id)) {
    x.client.guilds.forEach(guild => {
      x.database.query('INSERT INTO `guilds` VALUES (?, ?, ?, NULL, NULL, NULL, NULL, \'!\', NULL, NULL)', [guild.id, guild.owner.id, guild.name], err => {
        if (err) {
          x.log('ERROR! Couldn\'t add new guild to database.');
        }
      });
    });
  }
}

function messageOwnersAboutSupport(x) {
  if (hasPermission(x, x.msg.author.id)) {
    x.client.guilds.forEach(guild => {
      var ownerMessage = x.args;
      ownerMessage = ownerMessage.replace(/\$prefix/g, x.config.prefix);
      ownerMessage = ownerMessage.replace(/\$server/g, guild.name);
      guild.owner.send(ownerMessage);
    });
  }
}

function addCmds(x) {
  x['reload'] = reload;
  x['servers'] = servers;
  x['ping'] = ping;
  x['rebuildGuilds'] = rebuildGuilds;
  x['messageOwnersAboutSupport'] = messageOwnersAboutSupport;
  x['bugreport'] = bugreport;
}

module.exports = {
  addCmds: addCmds
}
