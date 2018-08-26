const Discord = require('discord.js');

function warn(x) {
  var usr = x.msg.mentions.users.array()[0];

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = '" + x.msg.guild.id + "'", function(err, result, fields) {

      if (err) {
        x.log(err);
      }

      x.log(result);

      var spaceIndex = x.args.indexOf(' ');
      var reason;
      var unix = Math.floor(new Date() / 1000);
      var caseid = x.msg.guild.nameAcronym + unix;
      if (spaceIndex == -1) {
        reason = '<None given>';
        x.log('no reason given');
      } else {
        reason = x.args.slice(x.args.indexOf(' ') + 1);
        x.log(reason + ', ' + x.args + ', ' + (x.args.indexOf(' ') + 1))
      }

      var embed = new Discord.RichEmbed()
        .setTitle("Case #" + caseid)
        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor('#FF0000')
        .setDescription('**A new case has been created!** \n\nType: __**WARNING**__ \nReason: **' + reason + '** \nUser: <@' + usr.id + '>')
        .setFooter('User Warned | Dantè Beta')
        .setTimestamp();

      try {
        x.msg.guild.channels.get(result[0].caselogs).sendMessage({
          embed
        });
      } catch (err) {
        x.log('ERROR - warn - ' + err);
      }

      usr.send("You have been warned on " + x.msg.guild.name + " for the following reason: \n\n" + reason);

      x.database.query("INSERT INTO `cases` (`caseref`, `serverid`, `userid`, `modid`, `reason`, `type`) VALUES (\"" + caseid + "\", \"" + x.msg.guild.id + "\", \"" + usr.id + "\", \"" + x.msg.author.id + "\", \"" + reason + "\", \"WARNING\")", function(err, result, fields) {

        if (err) {
          x.log(err);
        }


      })
    })
  } catch (err) {
    x.log('ERROR - warn - ' + err);
  }
}

function kick(x) {
  var usr = x.msg.mentions.users.array()[0];
  var member = x.msg.mentions.members.array()[0];

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = '" + x.msg.guild.id + "'", function(err, result, fields) {

      if (err) {
        x.log(err);
      }

      x.log(result);

      var spaceIndex = x.args.indexOf(' ');
      var reason;
      var unix = Math.floor(new Date() / 1000);
      var caseid = x.msg.guild.nameAcronym + unix;
      if (spaceIndex == -1) {
        reason = '<None given>';
        x.log('no reason given');
      } else {
        reason = x.args.slice(x.args.indexOf(' ') + 1);
        x.log(reason + ', ' + x.args + ', ' + (x.args.indexOf(' ') + 1))
      }

      var embed = new Discord.RichEmbed()
        .setTitle("Case #" + caseid)
        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor('#FF0000')
        .setDescription('**A new case has been created!** \n\nType: __**KICK**__ \nReason: **' + reason + '** \nUser: <@' + usr.id + '>')
        .setFooter('User Kicked | Dantè Beta')
        .setTimestamp();

      try {
        x.msg.guild.channels.get(result[0].caselogs).sendMessage({
          embed
        });
      } catch (err) {
        x.log('ERROR - kick - ' + err);
      }
      member.kick();
      usr.send("You have been kicked from " + x.msg.guild.name + " for the following reason: \n\n" + reason);

      x.database.query("INSERT INTO `cases` (`caseref`, `serverid`, `userid`, `modid`, `reason`, `type`) VALUES (\"" + caseid + "\", \"" + x.msg.guild.id + "\", \"" + usr.id + "\", \"" + x.msg.author.id + "\", \"" + reason + "\", \"KICK\")", function(err, result, fields) {

        if (err) {
          x.log(err);
        }


      })
    })
  } catch (err) {
    x.log('ERROR - kick - ' + err);
  }
}

function ban(x) {
  var usr = x.msg.mentions.users.array()[0];
  var member = x.msg.mentions.members.array()[0];

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = '" + x.msg.guild.id + "'", function(err, result, fields) {

      if (err) {
        x.log(err);
      }

      x.log(result);

      var spaceIndex = x.args.indexOf(' ');
      var reason;
      var unix = Math.floor(new Date() / 1000);
      var caseid = x.msg.guild.nameAcronym + unix;
      if (spaceIndex == -1) {
        reason = '<None given>';
        x.log('no reason given');
      } else {
        reason = x.args.slice(x.args.indexOf(' ') + 1);
        x.log(reason + ', ' + x.args + ', ' + (x.args.indexOf(' ') + 1))
      }

      var embed = new Discord.RichEmbed()
        .setTitle("Case #" + caseid)
        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor('#FF0000')
        .setDescription('**A new case has been created!** \n\nType: __**BAN**__ \nReason: **' + reason + '** \nUser: <@' + usr.id + '>')
        .setFooter('User Banned | Dantè Beta')
        .setTimestamp();

      try {
        x.msg.guild.channels.get(result[0].caselogs).sendMessage({
          embed
        });
      } catch (err) {
        x.log('ERROR - ban - ' + err);
      }
      member.kick();
      usr.send("You have been banned from " + x.msg.guild.name + " for the following reason: \n\n" + reason);

      x.database.query("INSERT INTO `cases` (`caseref`, `serverid`, `userid`, `modid`, `reason`, `type`) VALUES (\"" + caseid + "\", \"" + x.msg.guild.id + "\", \"" + usr.id + "\", \"" + x.msg.author.id + "\", \"" + reason + "\", \"BAN\")", function(err, result, fields) {
        if (err) {
          x.log(err);
        }
      })
    })
  } catch (err) {
    x.log('ERROR - ban - ' + err);
  }
}

function user(x) {
  var usr = x.msg.mentions.members.array()[0];
  var punishmentinfo = "";

  x.database.query("SELECT * FROM `cases` WHERE userid = '" + usr.id + "'", function(err, result, fields) {
    if (err) {
      x.log(err);
    } else {

      result.forEach(function(data, pos, array) {
        punishmentinfo = punishmentinfo + "type: " + data.type + "\nreason: " + data.reason + "\nref: " + data.caseref + "\n\n";
      })

      var embed = new Discord.RichEmbed()
        .setTitle(usr.user.username)
        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor('#FF0000')
        .setDescription('Username: ' + usr.user.username + "#" + usr.user.discriminator + '\nID: ' + usr.id + '\nJoined discord: ' + usr.user.createdAt + "\nJoined server: " + usr.joinedAt + "\n\n__Punishments__\n" + punishmentinfo)
        .setFooter('User Info | Dantè Beta')
        .setTimestamp();

      x.msg.channel.send({
        embed
      });
    }
  });
}

function addCmds(x) {
  x['warn'] = warn;
  x['user'] = user;
  x['kick'] = kick;
  x['ban'] = ban;
}

module.exports = {
  addCmds: addCmds
};