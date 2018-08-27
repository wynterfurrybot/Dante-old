/* Moderation with criminal records.
 * This makes moderation a lot easier.
 */
const Discord = require('discord.js');

async function hasPermission(msg, cmd, permission) {
  if (msg.member.hasPermission(permission)) {
    return true;
  } else {
    msg.author.send(`You don't have permission to use '${cmd}'.`)
    return false;
  }
}

async function warn(x) {
  var usr = x.msg.mentions.users.array()[0];

  if (!hasPermission(x.msg, 'warn', 'KICK_MEMBERS')) return;

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [x.msg.guild.id], async function(err, result, fields) {

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

      x.database.query("INSERT INTO `cases` (`caseref`, `serverid`, `userid`, `modid`, `reason`, `type`) VALUES (?, ?, ?, ?, ?, \"WARNING\")", [caseid, x.msg.guild.id, usr.id, x.msg.author.id, reason], async function(err, result, fields) {

        if (err) {
          x.log(err);
        }


      })
    })
  } catch (err) {
    x.log('ERROR - warn - ' + err);
  }
}

async function kick(x) {
  var usr = x.msg.mentions.users.array()[0];
  if (!hasPermission(x.msg, 'kick', 'KICK_MEMBERS')) return;

  var member = x.msg.mentions.members.array()[0];

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [x.msg.guild.id], async function(err, result, fields) {

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

      x.database.query("INSERT INTO `cases` (`caseref`, `serverid`, `userid`, `modid`, `reason`, `type`) VALUES (?, ?, ?, ?, ?, \"KICK\")", [caseid, x.msg.guild.id, usr.id, x.msg.author.id, reason], async function(err, result, fields) {

        if (err) {
          x.log(err);
        }


      })
    })
  } catch (err) {
    x.log('ERROR - kick - ' + err);
  }
}

async function ban(x) {
  var usr = x.msg.mentions.users.array()[0];
  if (!hasPermission(x.msg, 'ban', 'BAN_MEMBERS')) return;

  var member = x.msg.mentions.members.array()[0];

  try {
    x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [x.msg.guild.id], async function(err, result, fields) {

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
      member.ban();
      usr.send("You have been banned from " + x.msg.guild.name + " for the following reason: \n\n" + reason);

      x.database.query("INSERT INTO `cases` (`caseref`, `serverid`, `userid`, `modid`, `reason`, `type`) VALUES (?, ?, ?, ?, ?, \"BAN\")", [caseid, x.msg.guild.id, usr.id, x.msg.author.id, reason], async function(err, result, fields) {

        if (err) {
          x.log(err);
        }
      })
    })
  } catch (err) {
    x.log('ERROR - ban - ' + err);
  }
}

async function user(x) {
  var usr = x.msg.mentions.members.array()[0];
  if (!hasPermission(x.msg, 'user', 'KICK_MEMBERS')) return;

  var punishmentinfo = "";

  x.database.query("SELECT * FROM `cases` WHERE userid = ?", [usr.id], async function(err, result, fields) {
    if (err) {
      x.log(err);
    } else {

      result.forEach(async function(data, pos, array) {
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

async function clear(x) {
  if (!hasPermission(x.msg, 'clear', 'MANAGE_MESSAGES')) return;

  try {
    var deleteCount = parseInt(x.args);
    deleteCount = deleteCount + 1;
    if (deleteCount >= 101) {
      deleteCount = 100;
    }

    if (!deleteCount || deleteCount < 3 || deleteCount > 100)
      return x.msg.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await x.msg.channel.fetchMessages({
      limit: deleteCount
    });
    x.msg.channel.bulkDelete(fetched)
      .catch(error => x.msg.reply(`Couldn't delete messages because of: ${error}`));
  } catch (err) {
    x.log(err);
  }

  x.database.query("SELECT * FROM guilds WHERE guild_id = ?", [x.msg.guild.id], async function(err, result, fields) {

    if (err) {
      x.log(err);
    }

    x.log(result);

    var embed = new Discord.RichEmbed()
      .setTitle("Bulk delete")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor('#FF0000')
      .setDescription('**' + deleteCount + " messages deleted in <#" + x.msg.channel.id + ">** \nModerator: <@" + x.msg.author.id + ">")
      .setFooter('Messages purged | Dantè Beta')
      .setTimestamp();

    try {
      x.msg.guild.channels.get(result[0].caselogs).sendMessage({
        embed
      });
    } catch (err) {
      x.log('ERROR - ban - ' + err);
    }

  });
}

async function set(x) {
  if (!hasPermission(x.msg, 'set', 'ADMINISTRATOR')) return;

  x.database.query("INSERT INTO `guilds` (guild_id, owner_id, name) VALUES (?, ?, ?)", [x.msg.guild.id, x.msg.guild.owner.id, x.msg.guild.name], async function(err, result, fields) {
    if (err) {
      x.log(err);
      // Likely this will be to say the guild ID already exists. As such, we will log the error but not take much notice of it.
    }
  })


  var type = x.args;

  if (type === "caselogs") {
    x.database.query("UPDATE `guilds` SET caselogs = ? WHERE guild_id = ?", [x.msg.channel.id, x.msg.guild.id], async function(err, result, fields) {
      if (err) {
        x.log(err);
        x.msg.channel.send("An error has occured whilst trying to update the channel ID.");
      } else {
        x.msg.channel.send(":ok_hand: Set the new channel ID to " + x.msg.channel.id);
      }
    })
  }

  if (type === "messagelogs") {
    x.database.query("UPDATE `guilds` SET msglogs = ? WHERE guild_id = ?", [x.msg.channel.id, x.msg.guild.id], async function(err, result, fields) {
      if (err) {
        x.log(err);
        x.msg.channel.send("An error has occured whilst trying to update the channel ID.");
      } else {
        x.msg.channel.send(":ok_hand: Set the new channel ID to " + x.msg.channel.id);
      }
    })
  }

  if (type === "userlogs") {
    x.database.query("UPDATE `guilds` SET userlogs = ? WHERE guild_id = ?", [x.msg.channel.id, x.msg.guild.id], async function(err, result, fields) {
      if (err) {
        x.log(err);
        x.msg.channel.send("An error has occured whilst trying to update the channel ID.");
      } else {
        x.msg.channel.send(":ok_hand: Set the new channel ID to " + x.msg.channel.id);
      }
    })
  }

  if (type === "otherlogs") {
    x.database.query("UPDATE `guilds` SET additionallogs = ? WHERE guild_id = ?", [x.msg.channel.id, x.msg.guild.id], async function(err, result, fields) {
      if (err) {
        x.log(err);
        x.msg.channel.send("An error has occured whilst trying to update the channel ID.");
      } else {
        x.msg.channel.send(":ok_hand: Set the new channel ID to " + x.msg.channel.id);
      }
    })
  }


}

async function mute(x) {


  if (!hasPermission(x.msg, 'mute', 'MANAGE_MESSAGES')) return;


  try {
    var usr = x.msg.mentions.members.array()[0];
    usr.send("You were muted from " + x.msg.guild.name);
    var role = x.msg.guild.roles.find(`name`, "muted");
    if (!role) return;

    var member = x.msg.mentions.members.array()[0];
    x.log('name: ' + role.name);
    member.addRole(role);
    x.msg.channel.send("Muted " + member.user.username);
  } catch (err) {
    x.log(err);
  }

}

async function addCmds(x) {
  x['warn'] = warn;
  x['w'] = warn;
  x['user'] = user;
  x['u'] = user;
  x['kick'] = kick;
  x['k'] = kick;
  x['ban'] = ban;
  x['b'] = ban;
  x['mute'] = mute;
  x['m'] = mute;
  x['clear'] = clear;
  x['set'] = set;
}

module.exports = {
  addCmds: addCmds
};