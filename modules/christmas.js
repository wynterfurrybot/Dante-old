const Discord = require('discord.js');
const claimed = new Set();
function advent (x) {
 
  if (claimed.has(x.msg.author.id)) {
	  x.msg.author.send("I'm here to tell you that you can't get a chocolate until tomorrow. \n\nSorry about that!");
}

else{
	claimed.add(x.msg.author.id);
	
	
	var dn = new Date();
	var num = dn.getDate();
	if(num >= 25)
	{
		num = 0;
	}
	else{
	num = 25 - num;
	}
	
	
	
	var embed = new Discord.RichEmbed()
      .setTitle(num + " days until christmas!")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#FF0000')
      .setDescription("Here is your daily chocolate!")
      .setFooter('Have a nice christmas!')
      .setImage("https://images.godiva.com/is/image/godiva/milk-chocolate-mustache-piece~~MOEMILK-1?$pdp-main$")
      .setTimestamp();

      x.msg.author.send({embed});
	
	setTimeout(() => {
          // Delete the user from the set after a day.
          claimed.delete(x.msg.author.id);
        }, 86400000);
}
}

var snowballs = 2;

function snowball (x){
	
	if (x.author.id === "129810247979106305")
	{
		x.author.send("You are temporarily banned from using the snowball command.");
		return;
	}
	snowballs = snowballs + 1;
	var embed = new Discord.RichEmbed()
      .setTitle("SNOWBALL FIGHT")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#ffffff')
      .setDescription("<@" + x.msg.author.id + "> *walks up to* "  + x.args + " *sneakily, THROWING A GIANT SNOWBALL RIGHT AT THEIR FACE.*")
      .setFooter(snowballs + ' snowballs thrown globally! | Snowball fight!')
      .setImage("https://c1.staticflickr.com/5/4040/4250432813_1a00a9e716_b.jpg")
      .setTimestamp();

      x.msg.channel.send({embed});
}


function addCmds(x) {
  //x["advent"] = advent;
  x["snowball"] = snowball;
}

module.exports = {
  addCmds: addCmds
}
