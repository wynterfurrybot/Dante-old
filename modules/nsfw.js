const e621 = require('./e621.js');
const Discord = require('discord.js');

function gayyiff (x) {
  if(!x.msg.channel.nsfw) return;
  var fetch = true;
  var blockedtags = new Set(['father_and_son', 'young', 'cub', 'bestiality', 'human', 'r34']);
  var request = e621.random("m/m", "E", 1, post => {
  var tags = post[0]['tags'];

    if (tags.includes(blockedtags))
    {
      var embed = new Discord.RichEmbed()
        .setTitle("Failed")
        .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor('#FF0000')
        .setDescription('Could not post this image.')
        .setFooter('Image tags blocked. \nWill fix this tomorrow to generate a new image.')
        .setTimestamp();

        x.msg.channel.send({embed});
      return;
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
  x["gayyiff"] = gayyiff;
}

module.exports = {
  addCmds: addCmds
}
