module.exports = function () {
  return new Promise((resolve, reject) => {
    var exec = require('child_process').exec;
    var command = `./node_modules/.bin/nyc report --reporter=lcovonly > ./coverage/lcov.info`;
    exec(command, (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
};
