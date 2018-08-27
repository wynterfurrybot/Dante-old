
/* Commands specific to developors.
 * Do not use as you will not be allowed
 */

function hasPermission(x, usrId) {
  x.log('checking permission');
  var isPermitted = false;
  x.config.botModerators.forEach(id => {
    x.log(`${id} == ${usrId}, ${id == usrId}`);
    if (id == usrId) {
      isPermitted = true;
    }
  });
  return isPermitted;
}

function reload(x) {
  if (hasPermission(x, x.msg.author.id)) {
    x.log('Permission granted. Reloading...');
    x.reloadFunc();
    x.log('Reloaded.');
  }
}

function addCmds(x) {
  x['reload'] = reload;
}

module.exports = {
  addCmds: addCmds
}
