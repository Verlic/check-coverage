var filename = process.env.LCOV_FILE || 'lcov-diff.txt';

module.exports = function (branchName) {
  return new Promise((resolve, reject) => {
    var exec = require('child_process').exec;
    var command = `git diff master ${branchName} -U0 > ${filename}`;
    exec(command, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};
