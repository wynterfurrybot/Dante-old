const e621 = require('./e621.js');
const Discord = require('discord.js');
function e6 (x) {
  if(!x.msg.channel.nsfw) return;
  var send = true;
  var request = e621.random(x.args, "E", 1, post => {
    try{
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
    }

    catch{
      if(send){
      var embed = new Discord.RichEmbed()
      .setTitle('Blocked Image')
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#FF0000')
      .setDescription('Lets just say e621 has a lot of cub porn. \n\nIf you\'re getting this, the bot tried to find a clean image 50 times, but failed.')
      .setTimestamp();

      x.msg.channel.send({embed});
      send = false;
    }
  }
  })
}

function addCmds(x) {
  x["e6"] = e6;
}

module.exports = {
  addCmds: addCmds
}
