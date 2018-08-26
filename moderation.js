const Discord = require('discord.js');

function warn(x){
  var usr = x.msg.mentions.users.array()[0];

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = '" + x.msg.guild.id + "'", function(err, result, fields) {

      if(err)
      {
        x.log(err);
      }

      x.log(result);

      var spaceIndex = x.args.indexOf(' ');
      var reason;
      if (spaceIndex == -1) {
        reason = '<None given>';
      } else {
        reason = x.args.slice(x.args.indexOf(' ') + 1);
      }

      var embed = new Discord.RichEmbed()
      .setTitle("A new case has been created")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#FF0000')
      .setDescription('**A new case has been created!** \n\nType: __**WARNING**__ \nReason: **' + reason + '** \nUser: <@' + usr.id + '>')
      .setFooter('User Warned | Damien Beta')
      .setTimestamp();

      try {
        x.msg.guild.channels.get(result[0].caselogs).sendMessage({
          embed
        });
      } catch (err) {
        x.log('ERROR - warn - ' + err);
      }

    usr.send("You have been warned on " + x.msg.guild.name + " for the following reason: \n\n" + reason);
    })
  }

  catch(err)
  {
    x.log('ERROR - warn - ' + err);
  }
}

function addCmds(x) {
  x['warn'] = warn;
}


module.exports = {
  addCmds: addCmds
};
