/*global require */
'use strict';

var minifyPipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var assert = require('stream-assert');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-minify-js', function() {
  describe('Pipeline functionality', function() {
    it('Should output two files if concatenate is true', function (done) {
      gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline().minifyJS())
        .pipe(assert.length(2))
        .pipe(assert.end(done));

    });

    it('Should output one file if concatenate is false', function (done) {
      gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline({concatenate: false}).minifyJS())
        .pipe(assert.length(4))
        .pipe(assert.end(done));
    });
  });
});
