const e621 = require('./e621.js');
const Discord = require('discord.js');

function e6 (x) {
  if(!x.msg.channel.nsfw) return;
  var params = x.args.split(' ');
  var tags = params[0];
  var limit = params[1];
  if(!limit)
  {
    limit = 1;
  }

  var request = e621.random(tags, "E", limit, post => {
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
