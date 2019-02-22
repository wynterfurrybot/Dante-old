
/* Basic help command.
 * Reads from './help' directory and displays them in DMs
 */

const fs = require('fs');

function displayHelp(user, file) {
  fs.readFile(file, (err, data) => {
    if (err) {
      user.send('Sorry. I can\'t help you.');
    }

    for (var i = 0; i < data.length; i += 2000 - 6) {
      user.send('```' + data.slice(i, i + 2000 - 6) + '```')
    }
  })
}

function help(x) {
  if (x.args.length == 0) {
    displayHelp(x.msg.author, './help/master.txt');
  } else {
    if (x.args.indexOf('.') != -1 || x.args.indexOf('/') != -1 || x.args.indexOf('~') != -1) {
      // Someone is being malicious. Stop.
      return;
    }
    displayHelp(x.msg.author, `./help/${x.args}.txt`);
  }
}

function info(x) {
  x.msg.channel.send(x.getEmbed(x.config.info, {
    "guilds": `${x.client.guilds.size}`,
    "ping": `${Math.round(x.client.ws.ping)}`
  }));
}

function addCmds(x) {
  x['help'] = help
  x['info'] = info
}

module.exports = {
  addCmds: addCmds
}
