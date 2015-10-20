/*global require */
'use strict';

var minifyPipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var assert = require('stream-assert');

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-minify-js', function() {

  describe('Pipeline concat functionality', function() {
    it('Should output two files if concat is true with sourcemaps', function (done) {

      //TODO should test file name
      return gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline().minifyJS())
        .pipe(assert.length(2))
        .pipe(assert.end(done));

    });

    it('Should output four files if concat is false with sourcemaps', function (done) {
      return gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline({concat: false}).minifyJS())
        .pipe(assert.length(4))
        .pipe(assert.end(done));
    });
  });
});