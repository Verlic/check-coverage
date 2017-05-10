module.exports = function (options) {
  var getBranch = require('./branch-name');
  var generateDiff = require('./generate-diff');
  var gitDiff = require('./git-diff');
  var coverageDiff = require('./cover-diff');

  var diffName = options.diff;

  getBranch()
    .then((branch) => generateDiff(branch))
    .then(() => {
      var git = gitDiff(diffName);
      var coverage = coverageDiff(options.coverage);
      var hasUncoveredLines = false;
      console.log('Analyzing git changes with coverage report...\n');
      for (var file in git.files) {
        if (!coverage.files[file]) {
          // Missing coverage
          console.log(file, '\n\t- Missing coverage for the whole file');
          hasUncoveredLines = true;
        } else {
          var uncoveredLines = [];

          for (var line in git.files[file].lines) {
            var coveredFile = coverage.files[file];
            if (coveredFile.lines.hasOwnProperty(line) && !coveredFile.lines[line]) {
              uncoveredLines.push(line);
            }
          }

          console.log(file, '\n\t- The following lines are not covered:', uncoveredLines.join(', '));
          hasUncoveredLines = true;
        }
      }

      if (!hasUncoveredLines) {
        console.log('No uncovered lines detected in the diff');
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
