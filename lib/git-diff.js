var fs = require('fs');
var path = require('path');
var data = {};

function beginHunk(lines, index, fileName) {
  var line = lines[index];
  var args = line.split(' ')[2]; // We want the second group of changes
  var lineStart = args.split(',')[0].slice(1);
  var lineTotal = args.split(',')[1] || 1;
  lineTotal = parseInt(lineStart) + parseInt(lineTotal);

  for (var i = lineStart; i <= lineTotal; i++) {
    data.files[fileName].lines[i] = true;
  }

  index++;
}

function beginFileCheck(lines, index, fileName) {
  var endOfFileCheck = false;

  while (index < lines.length && !endOfFileCheck) {
    var line = lines[index];
    if (line.startsWith('@@')) {
      // Begin Hunk
      beginHunk(lines, index, fileName);
    }

    if (line.startsWith('diff')) {
      // End of File
      endOfFileCheck = true;
    }

    index++;
  }
}

module.exports = function (report) {
  var diff = fs.readFileSync(path.join(process.cwd(), report)).toString();
  var lines = diff.split('\n');
  var index = 0;
  data = {
    files: {}
  };

  while (index < lines.length) {
    var line = lines[index];
    var beginFile = line.slice(4);
    if (beginFile.startsWith('b/')) {
      // Begin File mode
      var fileName = beginFile.replace('b/', '');
      data.files[fileName] = { lines: {} };
      beginFileCheck(lines, index, fileName);
    }

    index++;
  }

  return data;
};
