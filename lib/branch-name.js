module.exports = function () {
  return new Promise((resolve, reject) => {
    var exec = require('child_process').exec;
    exec('git branch | grep \\*', (error, stdout) => {
      if (error) {
        return reject(error);
      }

      resolve(stdout.replace('* ', '').replace('\n', ''));
    });
  });
}
