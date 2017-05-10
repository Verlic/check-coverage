#! /usr/bin/env node
const yargs = require('yargs');
const join = require('path').join;

const yargsOptions = {
  coverage: {
    demand: false,
    describe: 'Coverage report from NYC (Istanbul). Accepts lcov-only report',
    type: 'string'
  },
  diff: {
    demand: false,
    describe: 'Output of the git diff between the current branch and master. Defaults to "lcov-diff.txt"',
    type: 'string'
  }
};

const argv = yargs
  .usage('Usage: $0 [...options]\n\n- First, you need to export your nyc (istanbul) coverage using the "lcov-only" report. E.g.: nyc report --reporter=lcovonly > ./coverage/lcov.info\n- Then you can run the application.')
  .options(yargsOptions)
  .help('h')
  .alias('h', 'help').argv;

const lcovName = argv.coverage || './coverage/lcov.info';
const lcovFile = join(process.cwd(), lcovName);
const diffFile = argv.diff || './lcov-diff.txt';
const diffCoverage = require('../lib/index');

diffCoverage({ diff: diffFile, coverage: lcovFile });
