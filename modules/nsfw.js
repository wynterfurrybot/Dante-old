const e621 = require('./e621.js');
const Discord = require('discord.js');

function gayyiff (x) {
  if(!x.msg.channel.nsfw) return;
  var request = e621.random("m/m", "E", 1, body => {
  var post = JSON.parse(body);
  var embed = new Discord.RichEmbed()
    .setTitle("New yiff image -- score: " + post[0]['score'])
    .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
    /*
     * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
     */
    .setColor('#FF0000')
    .setDescription(post[0]['description'] + "\nSource: http://e621.net/post/show/" + post[0]['id'])
    .setFooter('Hot yiff | Dantè Beta')
    .setImage(post[0]['preview_url'])
    .setTimestamp();
})
}

function addCmds(x) {
  x["gayyiff"] = gayyiff;
}

module.exports = {
  addCmds: addCmds
}
