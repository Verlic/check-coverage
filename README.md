# Git Diff Coverage for Istanbul

This module scans your `nyc` (istanbul) lcov-only report and compares it against the current git diff between your actual branch and master. If one of the changes you made is not covered by nyc, the module will tell you which line and which file.

> **Note:** this module is currently under development. Please fill a bug if you find them :)

## Install

`npm i Verlic/diff-coverage`

## Usage

First, you need to export your nyc (istanbul) coverage using the "lcov-only" report. E.g.: `nyc report --reporter=lcovonly > ./coverage/lcov.info`

Then you can run the application using the default to generate the comparison files and return the output report. Just run `diff-coverage`.

