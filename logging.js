const Discord = require('discord.js');

function getGuildsFromUser(user) {
    return x.client.guilds.filter(guild => {
        return guild.member(user) !== undefined;
    });
}

function addEvents(x) {

    x.client.on("messageDelete", (messageDelete) => {

        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + messageDelete.guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Deleted Message: '.gray + ' Content: '.cyan + messageDelete.content);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Message Deleted")
                    .setAuthor("Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#FF0000')
                    .setDescription('Message content:\n' + messageDelete.content + '\n\nMessage ID:\n' + messageDelete.id + '\n\nChannel:\n' + messageDelete.channel.name)
                    .setFooter('Message sent by ' + messageDelete.author.username + '#' + messageDelete.author.discriminator + ' | Damien Beta')
                    .setTimestamp();

                try {
                    x.client.channels.get(result[0].msglogs).sendMessage({ embed });
                }

                catch (err)
                {
                    return;
                }
            })
        }

        catch (err) {

        }



    });

    x.client.on('messageUpdate', (oldMessage, newMessage) => {

    if(newMessage.channel.id === "475003135220383744")
    {
    // On receive message, (Given string `msg`) from channel #awoo
    if (!/^(\*|_)*awo+f?(!|\*|_)*( ?(:3|<3|owo|uwu))?( ?❤️)?(\*|_)*$/ui.test(newMessage.content)) {

    try{
    newMessage.delete();
    }

    catch(e){
        newMessage.author.send("Error" + e);
    }
    newMessage.author.send("Clever try, but I found you. \n\nNo " + newMessage.content + ", only awoo!");
    }
    }

        if (!oldMessage.content)
        {
            return;
        }





        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + oldMessage.guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' Old message: '.cyan + oldMessage.content + ' New message: ' + newMessage.content +'\n\nMessage ID:\n' + newMessage.id);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Message Edited")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#FFA500')
                    .setDescription('Old Message:\n' + oldMessage.content + '\n\nNew Message:\n' + newMessage.content + '\n\nChannel:\n' + newMessage.channel.name)
                    .setFooter('Message sent by ' + oldMessage.author.username + '#' + oldMessage.author.discriminator + ' | Damien Beta')
                    .setTimestamp();


                try {
                    x.client.channels.get(result[0].msglogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

                catch(err)
                {

                }


    });

    // Channel logs:

    x.client.on('channelCreate', channel => {

        try {
            console.log(channel.guild.id);
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + channel.guild.id , function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' Channel Created: '.cyan + channel.id);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Channel Created!")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#00ff11')
                    .setFooter('Channel Created ' + ' | Damien Beta')
                    .setTimestamp();


                    embed.setDescription('New channel has been made \nDetails: \n\n**Channel Name**: ' + channel.name + '\n**Channel ID**: ' +channel.id)





                try {
                    x.client.channels.get(result[0].additionallogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

        catch (err) {

        }

    })

    x.client.on('channelDelete', channel => {

        try {
            console.log(channel.guild.id);
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + channel.guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' Channel Destroyed: '.cyan + channel.id);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle(":wastebasket: Channel Removed!")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#FF0000')
                    .setFooter('Channel Deleted ' + ' | Damien Beta')
                    .setTimestamp();


                embed.setDescription('Channel was destroyed \nDetails: \n\n**Channel Name**: ' + channel.name + '\n**Channel ID**: ' + channel.id)





                try {
                    x.client.channels.get(result[0].additionallogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

        catch (err) {

        }

    })

    x.client.on('channelUpdate', (oldchan, newchan)  => {

        try {
            console.log(oldchan.guild.id);
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + oldchan.guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' Channel Updated: '.cyan + oldchan.id);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Channel Updated")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#00FFFF')
                    .setFooter('Channel Updated ' + ' | Damien Beta')
                    .setTimestamp();


                if (oldchan.name != newchan.name)
                {
                    embed.setDescription('Channel name changed! \n\nPrevious name: ' + oldchan.name + '\nNew name: ' + newchan.name);
                    try {
                        x.client.channels.get(result[0].additionallogs).sendMessage({ embed });
                    }

                    catch (err) {
                        return;
                    }
                }

                if (oldchan.topic != newchan.topic) {

                    if (!oldchan.topic && !newchan.topic)
                    {
                        return;
                    }

                    embed.setDescription('Channel topic changed! \n\nPrevious topic: ' + oldchan.topic + '\nNew topic: ' + newchan.topic);
                    try {
                        x.client.channels.get(result[0].additionallogs).sendMessage({ embed });
                    }

                    catch (err) {
                        return;
                    }
                }






            })
        }

        catch (err) {

        }

    })

    // User logs:

    x.client.on('guildMemberAdd', member => {



        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + member.guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' User Joined: '.cyan + member.displayName);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Member Joined!")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#00ff11')
                    .setFooter('User joined: ' + member.user.username + '#' + member.user.discriminator + ' | Damien Beta')
                    .setTimestamp();

                try {
                    embed.setDescription('New user has joined the guild! \n\nUser details: \n**Playing:** ' + member.presence.game.name + '\n**User status:** ' + member.presence.status + '\n**Joined Discord @** ' + member.user.createdAt + '\nID: ' + member.user.id)
                }

                catch (err)
                {
                    embed.setDescription('New user has joined the guild! \n\nUser details: \n**Playing:** N/A ' + '\n**User status:** ' + member.presence.status +  '\n**Joined Discord @** ' + member.user.createdAt + '\nID: ' + member.user.id)
                }


                try {
                    x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

        catch (err) {

        }

    });



    x.client.on('guildMemberRemove', member => {
        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + member.guild.id, function (err, result, fields) {



                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' User Left: '.cyan + member.displayName);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Member Left!")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#FF0000')
                    .setDescription('A user has left the guild! \nID: ' + member.user.id)
                    .setFooter('User left: ' + member.user.username + '#' + member.user.discriminator + ' | Damien Beta')
                    .setTimestamp();


                try {
                    x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

        catch (err) {

        }

    });

    x.client.on('userUpdate', (oldmember, newmember) => {
        try {

          var guilds = getGuildsFromUser(oldmember);
          console.log(guilds);

          guilds.forEach(function (g)
        {
          x.database.query("SELECT * FROM guilds WHERE guild_id = " + g.id, function (err, result, fields) {


              if (err) {
                  console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
              }

              if (x.logging) {
                  console.log('Logging: '.gray + ' User Updated: '.cyan + oldmember.displayName);
              }

              var embed = new Discord.RichEmbed()
                  .setTitle("Member Updated Details")
                  .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                  /*
                  * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                  */
                  .setColor('#00FFFF')
                  .setFooter('User updated profile | ' + newmember.user.username + '#'+ newmember.user.discriminator + ' | Damien Beta')
                  .setTimestamp();

              if (oldmember.username != newmember.username)
              {
                  embed.setDescription('Username changed: \nDetails: \n\nOld name: ' + oldmember.username + '\nNew name: ' + newmember.username);
                  try {
                      x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                  }

                  catch (err) {
                      return;
                  }
              }



              if (oldmember.user.avatarURL != newmember.user.avatarURL) {
                  embed.setDescription('User updated their profile picture');
                  embed.setThumbnail(oldmember.user.avatarURL);
                  embed.setImage(newmember.user.avatarURL);
                  try {
                      x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                  }

                  catch (err) {
                    x.client.channels.get("482299331647373313").sendMessage("fuck => " +err);
                      return;
                  }
              }





          })
        })

        }

        catch (err) {

        }

    });

    x.client.on('guildMemberUpdate', (oldmember, newmember) => {
        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + oldmember.guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' User Updated: '.cyan + oldmember.displayName);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Member Updated Details")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#00FFFF')
                    .setFooter('User updated profile | ' + newmember.user.username + '#'+ newmember.user.discriminator + ' | Damien Beta')
                    .setTimestamp();

                if (oldmember.nickname != newmember.nickname)
                {
                    embed.setDescription('Nickname changed: \nDetails: \n\nOld name: ' + oldmember.nickname + '\nNew name: ' + newmember.nickname);
                    try {
                        x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                    }

                    catch (err) {
                        return;
                    }
                }

                if (oldmember.user.username != newmember.user.username) {
                    embed.setDescription('Username changed: \nDetails: \n\nOld name: ' + oldmember.user.username + '\nNew name: ' + newmember.user.username);
                    try {
                        x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                    }

                    catch (err) {
                        return;
                    }
                }

                if (oldmember.user.avatarURL != newmember.user.avatarURL) {
                    embed.setDescription('User updated their profile picture');
                    embed.setThumbnail(oldmember.user.avatarURL);
                    embed.setImage(newmember.user.avatarURL);
                    try {
                        x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                    }

                    catch (err) {
                        return;
                    }
                }

                if (oldmember.roles.length != newmember.roles.length)
                {
                    embed.setDescription('Users roles were updated');

                    try {
                        x.client.channels.get(result[0].userlogs).sendMessage({ embed });
                    }

                    catch (err) {
                        return;
                    }
                }



            })
        }

        catch (err) {

        }

    });

    // Ban logs:

    x.client.on('guildBanAdd', (guild, member) => {

        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' User Banned: '.cyan + member.username);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Member Banned")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#FF0000')
                    .setDescription('A user has been vanished! \nID: ' + member.id)
                    .setFooter('User banned: ' + member.username + '#' + member.discriminator + ' | Damien Beta')
                    .setTimestamp();


                try {
                    x.client.channels.get(result[0].caselogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

        catch (err) {

        }

    })

    x.client.on('guildBanRemove', (guild, member) => {

        try {
            x.database.query("SELECT * FROM guilds WHERE guild_id = " + guild.id, function (err, result, fields) {


                if (err) {
                    console.log('ERROR: '.gray + ' Could not select from database '.red + err.toString().red);
                }

                if (x.logging) {
                    console.log('Logging: '.gray + ' User unbanned: '.cyan + member.username);
                }

                var embed = new Discord.RichEmbed()
                    .setTitle("Member Pardoned")
                    .setAuthor("Darkmane the lion's Damien", "https://darkmanethelion.co.uk/img/profile.png")
                    /*
                    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                    */
                    .setColor('#FF0000')
                    .setDescription('A user has been revived from the dead! \nID: ' + member.id)
                    .setFooter('User unbanned: ' + member.username + '#' + member.discriminator + ' | Damien Beta')
                    .setTimestamp();


                try {
                    x.client.channels.get(result[0].caselogs).sendMessage({ embed });
                }

                catch (err) {
                    return;
                }
            })
        }

        catch (err) {

        }

    })



    // Statuses (playing)

    x.client.on("guildCreate", guild => {
        // This event triggers when the bot joins a guild.
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        x.client.user.setActivity(`Serving ${x.client.guilds.size} servers`);
    });

    x.client.on("guildDelete", guild => {
        // this event triggers when the bot is removed from a guild.
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    x.client.user.setActivity(`Serving ${x.client.guilds.size} servers`);
    });

    x.client.on("guildCreate", guild => {
        // This event triggers when the bot joins a guild.
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        x.client.user.setActivity(`Serving ${x.client.guilds.size} servers`);
    });

}

module.exports = {
    addEvents: addEvents
};
