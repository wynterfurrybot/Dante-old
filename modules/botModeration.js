
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
    var embed = new Discord.RichEmbed()
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
  var ping =  Math.round(x.client.ping) + ' ms';
  var embed = new Discord.RichEmbed()
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

function addCmds(x) {
  x['reload'] = reload;
  x['servers'] = servers;
}

module.exports = {
  addCmds: addCmds
}
