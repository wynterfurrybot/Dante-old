function hug(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *walks upto*"  + x.args + " *sneakily, when they aren't looking, pouncing them from behind and trapping them in a big hug!*");
}

function nuzzle(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has nuzzled* " + x.args + " *neck.* OwO");
}

function rubs(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has rolled over on their back* \n" + "<@" + x.msg.author.id + "> wants belly rubs!");
}

function boop(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has booped* " + x.args + " *on the snoot.*");
}

function flop(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has flopped on* " + x.args + ". oof!");
}

function pat(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *pats* " + x.args + " *on the head softly, also giving generous scritches behind the ears while at it!*");
}

function growlat(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *puts his maw to* " + x.args + " *'s face and growls into their ear(s)*");
}

function glomp(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *pounces* " + x.args + " *, tackling them to the floor and trapping them in a giant hug of death!* \nIf you listen closely, you might hear confessions of love..");
}

function growl(x){
  x.msg.channel.send("*a light growl is heard from* <@" + x.msg.author.id + ">");
}

function milk(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *walks upto* " + x.args + " *and suddenly gives them a litre of milk...* \nI guess they have milk now?");
}

function snuggle(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has snuggled* " + x.args);
}

function cookie(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has given* " + x.args + " *a cookie!* \nIt also comes with a free glass of milk!");
}

function lick(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has licked* " + x.args + " \nApparently they taste good?");
}

function cinnabon(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has given* " + x.args + " *a cinnanon* \n\nIt also includes a pot of mayple syrup. Canada get over here!");
}

function throwdict(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has thrown a dictionary at* " + x.args + " \nKNOWLEDGE!");
}

function confetti(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *randomly throws confetti over* " + x.args + " \nSURPRISE!");
}

function scream(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *is* " + x.args + " \nTHEREFORE THEY MUST SCREAM!");
}

function kiss(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has kissed* " + x.args + " \nAre they french.. or just kissing?");
}

function nap(x){
  x.msg.channel.send("<@" + x.msg.author.id + "> *has decided to flop on* " + x.args + " \n\nAfter a while, a sound of snoring can be heard.. \n\nUpon further inspection, it appears <@" + x.msg.author.id + "> is fast asleep!");
}

function addCmds(x) {
  x['hug'] = hug;
  x['nuzzle'] = nuzzle;
  x['rubs'] = rubs;
  x['boop'] = boop;
  x['flop'] = flop;
  x['pat'] = pat;
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
}

function addEvents(client) {
  var respectsPaidToday = 0;
  var respectsPaidDay = new Date().getUTCDay();

  client.on('message', msg => {
    if (msg.content.toLowerCase() == 'f') {
      var thisRespectDay = new Date().getUTCDate();

      if (thisRespectDay != respectsPaidDay) {
        respectsPaidDay = thisRespectDay;
        respectsPaidToday = 0;
      }

      msg.channel.send('<@' + msg.author.id + '> **has paid respects.**\n\n' + ++respectsPaidToday + ' respects have been paid today.')
    }
  });
}

module.exports = {
  addCmds: addCmds,
  addEvents: addEvents
};
