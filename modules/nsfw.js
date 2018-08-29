const e621 = require('./e621.js');
const Discord = require('discord.js');

function e6 (x) {
  if(!x.msg.channel.nsfw) return;
  var request = e621.random(x.args, "E", 1, post => {
    if(!post)
    {
      var embed = new Discord.RichEmbed()
      .setTitle("Please stop.")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#FF0000')
      .setDescription("As per our policy, one of the tags you inputted is banned. \nBlocked tags are decided by both users and admins of the bot and include the following tags: \n\n'father_and_son', 'young', 'cub', 'bestiality', 'human', 'r34', 'mlp', 'my_little_pony'")
      .setFooter('Blocked image')
      .setTimestamp();
        x.msg.reply({embed});
    }
    var embed = new Discord.RichEmbed()
    .setTitle("New yiff image -- score: " + post[0]['score'])
    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
    /*
    * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
    */
    .setColor('#FF0000')
    .setDescription(post[0]['description'] + "\nSource: http://e621.net/post/show/" + post[0]['id'])
    .setFooter('Tags: ' + post[0]['tags'])
    .setImage(post[0]['sample_url'])
    .setTimestamp();

    x.msg.channel.send({embed});
  })
}

function addCmds(x) {
  x["e6"] = e6;
}

module.exports = {
  addCmds: addCmds
}
