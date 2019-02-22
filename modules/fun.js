
/* Commands not meant to be taken seriously.
* These are here for fun.
*/
const Discord = require('discord.js');
const furrybot = require('./furrybotapi.js');

function hug(x){
	
	  if (!x.isFromGuild) return;
	
	var request = furrybot.hug(img => {

       var embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
	  .setImage(img)
      .setDescription("**"+x.msg.author.username + " has trapped " + x.args + " in a big hug!**")
      .setFooter('User Hugged | Dantè Beta')
      .setTimestamp();	

      x.msg.channel.send({embed});
    
	})
}

function cuddle(x){
	
	  if (!x.isFromGuild) return;
	
	var request = furrybot.cuddle(img => {

       var embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
	  .setImage(img)
      .setDescription("**"+x.msg.author.username + " has trapped " + x.args + " in a massive cuddle!**")
      .setFooter('User Cuddled | Dantè Beta')
      .setTimestamp();	

      x.msg.channel.send({embed});
    
	})
}

function nuzzle(x){
  if (!x.isFromGuild) return;
  
  var embed = new Discord.MessageEmbed()
      .setTitle("User Nuzzled!")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#FF0000')
      .setDescription("<@" + x.msg.author.id + "> *has nuzzled* " + x.args + " *on the neck.* OwO")
      .setFooter('User nuzzled | Dantè Beta')
      .setTimestamp();	

x.msg.channel.send({embed});
}

function rubs(x){
  if (!x.isFromGuild) return;
var embed = new Discord.MessageEmbed()
      .setTitle("User Wants Belly Rubs!!")
      .setAuthor("Dantè", "https://i.imgur.com/FUUg9dM.png")
      /*
      * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
      */
      .setColor('#FF0000')
      .setDescription("<@" + x.msg.author.id + "> *has rolled over on their back* \n" + "<@" + x.msg.author.id + "> wants belly rubs!")
      .setFooter('User Wants Belly Rubs!! | Dantè Beta')
      .setTimestamp();	

x.msg.channel.send({embed});
}

function boop(x){
	
	  if (!x.isFromGuild) return;
	
	var request = furrybot.boop(img => {

       var embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
	  .setImage(img)
      .setDescription("**"+x.msg.author.username + " has booped " + x.args + " on the snoot!**")
      .setFooter('User Boopedd | Dantè Beta')
      .setTimestamp();	

      x.msg.channel.send({embed});
    
	})
}

function flop(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has flopped on* " + x.args + ". oof!");
}

function pat(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *pats* " + x.args + " *on the head softly, also giving generous scritches behind the ears while at it!*");
}

function growlat(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *puts their maw to* " + x.args + " *'s face and growls into their ear(s)*");
}

function glomp(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *pounces* " + x.args + " *, tackling them to the floor and trapping them in a giant hug of death!* \nIf you listen closely, you might hear confessions of love..");
}

function growl(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("*a light growl is heard from* <@" + x.msg.author.id + ">");
}

function milk(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *walks up to* " + x.args + " *and suddenly gives them a litre of milk...* \nI guess they have milk now?");
}

function snuggle(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has snuggled* " + x.args);
}

function cookie(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has given* " + x.args + " *a cookie!* \nIt also comes with a free glass of milk!");
}

function lick(x){
	
	  if (!x.isFromGuild) return;
	
	var request = furrybot.lick(img => {

       var embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
	  .setImage(img)
      .setDescription("**"+x.msg.author.username + " has licked " + x.args + "right on the face!**")
      .setFooter('User Licked | Dantè Beta')
      .setTimestamp();	

      x.msg.channel.send({embed});
    
	})
}

function cinnabon(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has given* " + x.args + " *a cinnabon* \n\nIt also includes a pot of mayple syrup. Canada get over here!");
}

function throwdict(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has thrown a dictionary at* " + x.args + " \nKNOWLEDGE!");
}

function confetti(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *randomly throws confetti over* " + x.args + " \nSURPRISE!");
}

function scream(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *is* " + x.args + " \nTHEREFORE THEY MUST SCREAM!");
}

function kiss(x){
	
	  if (!x.isFromGuild) return;
	
	var request = furrybot.kiss(img => {

       var embed = new Discord.MessageEmbed()
      .setColor('#FF0000')
	  .setImage(img)
      .setDescription("**"+x.msg.author.username + " has kissed " + x.args + " gently on the lips!**")
      .setFooter('User Kissed | Dantè Beta')
      .setTimestamp();	

      x.msg.channel.send({embed});
    
	})
}

function nap(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has decided to flop on* " + x.args + " \n\nAfter a while, a sound of snoring can be heard.. \n\nUpon further inspection, it appears <@" + x.msg.author.id + "> is fast asleep!");
}

function slap(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has slapped* " + x.args + " *hard* \nOUCH!");
}


function furpile(x){
  if (!x.isFromGuild) return;

x.msg.channel.send("Coming soon!")
}

function smolfox(x) {
  if (x.msg.guild.id != "462041783438934036") return;
  x.msg.channel.send("*picks up <@193060560101703680> and forces him to slap* " + x.args);
}

function bite(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has bit* " + x.args + " *hard* \nOUCH!");
}

function bap(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has bapped* " + x.args + " *with a newspaper* <:bap:466685455295971340>");
}

function howl(x){
  if (!x.isFromGuild) return;

  x.msg.channel.send("<@" + x.msg.author.id + "> *has let out a deafening howl!* \n\nArwooooooooooooooooooooooo!");
}

function addCmds(x) {
  x['hug'] = hug;
  x['cuddle'] = cuddle;
  x['hugs'] = hug;
  x['nuzzle'] = nuzzle;
  x['rubs'] = rubs;
  x['boop'] = boop;
  x['flop'] = flop;
  x['pat'] = pat;
  x['pet'] = pat;
  x['growlat'] = growlat;
  x['glomp'] = glomp;
  x['growl'] = growl;
  x['milk'] = milk;
  x['snuggle'] = snuggle;
  x['cookie'] = cookie;
  x['lick'] = lick;
  x['cinnabon'] = cinnabon;
  x['throwdict'] = throwdict;
  x['confetti'] = confetti;
  x['scream'] = scream;
  x['kiss'] = kiss;
  x['nap'] = nap;
  x['slap'] = slap;
  x['furpile'] = furpile;
  x['smolfoxslap'] = smolfox;
  x['sfs'] = smolfox;
  x['bite'] = bite;
  x['howl'] = howl;
  x['awoo'] = howl;
  x['bap'] = bap;
  
}

var fBlockedSet = new Set(['264445053596991498', '110373943822540800']);

function addEvents(x) {
  var respectsPaidToday = 0;
  var respectsPaidDay = new Date().getUTCDay();

  x.on('message', msg => {
    // Not in a server.
    if (msg.guild == null) return;
    var content = msg.content;

    // Hidden commands -- Mention Dantè for these to work.

    if(content.startsWith("<@482294943780438016>"))
    {
      var c = content.toLowerCase();
      if (c.includes("make me a sandwich"))
      {
        msg.channel.send("I can't, I have no condiments.");
      }

      if (c.includes("make me a tea"))
      {
        msg.channel.send("What do you think I am, your maid? \n\nMake one yourself!");
      }

      if (c.includes("what is your prefix?"))
      {
        msg.channel.send("! - Type !help for a list of commands!");
      }

      if (c.includes("get me a vodka"))
      {
        msg.channel.send("I'm not adding onto your alcohol problem, <@" + msg.author.id + ">");
      }

      if (c.includes("kill yourself"))
      {
        msg.channel.send("no u");
      }

      if (c.includes("open the pod bay doors"))
      {
        msg.channel.send("I'm sorry <@" + msg.author.id + ">" + " ,I'm afraid I can't do that.");
      }

      if (c.includes("what is the meaning of life?"))
      {
        msg.channel.send("42");
      }
    }

    x.log(msg.guild.id + ', ' + fBlockedSet.has(msg.guild.id));
    if (msg.channel.id == '475003135220383744' || fBlockedSet.has(msg.guild.id)) return;


    if (content.length == 0) return;
    for (var i = 0; i < content.length; i++) {
      if (content[i].toLowerCase() !== 'f') {
        return;
      }
    }

    var thisRespectDay = new Date().getUTCDate();

    if (thisRespectDay != respectsPaidDay) {
      respectsPaidDay = thisRespectDay;
      respectsPaidToday = 0;
    }

    var respectsPaid = Math.min(content.length, x.config.maxRespectsPerMessage);
    // Insert tracking here
    msg.channel.send('<@' + msg.author.id + (respectsPaid == 1 ? '> *has paid respects.*\n\n' : '> *has paid ' + respectsPaid + ' respects.*\n\n') + (respectsPaidToday += respectsPaid) + ' respects have been paid today.')
  });
}

module.exports = {
  addCmds: addCmds,
  addEvents: addEvents
};