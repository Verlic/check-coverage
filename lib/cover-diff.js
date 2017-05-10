var fs = require('fs');
var path = require('path');
var data = {};

function beginFileCheck(lines, index, fileName) {
  var endOfFileCheck = false;

  while (index < lines.length && !endOfFileCheck) {
    var line = lines[index];
    if (line.startsWith('DA:')) {
      // Begin Hunk
      var checkedLine = line.replace('DA:', '').split(',')[0];
      var isCovered = parseInt(line.replace('DA:', '').split(',')[1]) > 0;
      data.files[fileName].lines[checkedLine] = isCovered;
    }

    if (line.startsWith('end_of_record')) {
      // End of File
      endOfFileCheck = true;
    }

    index++;
  }
}


module.exports = function (reportFilename) {
  var diff = fs.readFileSync(reportFilename).toString();
  var lines = diff.split('\n');
  var index = 0;
  data = {
    files: {}
  };

  while (index < lines.length) {
    var line = lines[index];
    if (line.startsWith('SF:')) {
      // Begin File mode
      var fileName = line.replace('SF:' + process.cwd() + '/', '');
      data.files[fileName] = { lines: {} };
      beginFileCheck(lines, index, fileName);
    }

    index++;
  }

  return data;
};
