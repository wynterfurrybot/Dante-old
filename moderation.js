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

    x.database.query("INSERT INTO `guilds` (caseref, serverid, userid, modid, reason, type) VALUES ('" + caseid + "', '" + x.msg.guild.id + "', '" + usr.id +"', ' " + x.msg.author.id + "', '" + reason + "', 'WARNING')", function(err, result, fields) {

      if(err)
      {
        x.log(err);
      }


    })
    })
  }

  catch(err)
  {
    x.log('ERROR - warn - ' + err);
  }
}

function user(x){
  var usr = x.msg.mentions.members.array()[0];
  var punishmentinfo = "";

    x.database.query("SELECT * FROM cases WHERE userid = '" + usr.id + "'", function(err, result, fields) {

if(err)
{
  x.log(err);
}

else{

  result.forEach(function (data, pos, array) {

          punishmentinfo = punishmentinfo + "type: " + data.type + "\nreason: " + data.reason + "\nref: " data.caseref + "\n\n";

        })

        var embed = new Discord.RichEmbed()
        .setTitle(usr.username)
        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
        /*
        * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
        */
        .setColor('#FF0000')
        .setDescription('Username: ' + usr.user.username + "#" + usr.user.discriminator + '\nID: ' + usr.id + '\nJoined discord: ' + usr.user.createdAt + "\nJoined server: " + usr.user.joinedAt + "\n\n__Punishments__\n" + punishmentinfo)
        .setFooter('User Info | Dantè Beta')
        .setTimestamp();

x.msg.channel.send({embed});
}

    })
}



function addCmds(x) {
  x['warn'] = warn;
  x['user'] = user;
}


module.exports = {
  addCmds: addCmds
};
