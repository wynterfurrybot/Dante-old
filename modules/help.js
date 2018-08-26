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
        if (x.args.indexOf('.') != -1 || x.args.indexOf('/') != -1) {
            // Someone is being malicious. Stop them.
            return;
        }
        displayHelp(x.msg.author, `./help/${x.args}.txt`);
    }
}

function addCmds(x) {
    x['help'] = help
}

module.exports = {
    addCmds: addCmds
}
