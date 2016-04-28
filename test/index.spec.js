'use strict';

var assert = require('stream-assert');
var expect = require('chai').expect;
var gulp = require('gulp');
var handyman = require('pipeline-handyman');
var minifyPipeline = require('../src/index.js');
var path = require('path');

function getFixtures(glob) {
  return path.join(__dirname, 'fixtures', glob);
}

describe('pipeline-minify-js', function() {

  describe('Default Configuration', function() {
    it('Should output two files after concatenation; Minified file and sourcemap', function (done) {
      gulp
        .src(getFixtures('*'))
        .pipe(minifyPipeline.minifyJS())
        .pipe(assert.length(2))
        .pipe(assert.first(function (file) {
          var filename = handyman.getPackageName() + '.min.js.map';
          expect(file.relative.toString()).to.equal(filename);
        }))
        .pipe(assert.last(function (file) {
          expect(file.relative.toString()).to.equal(handyman.getPackageName() + '.min.js');
        }))
        .pipe(assert.end(done));
    });
  });

  describe('User specific configurations', function() {
    it('Should generate only the minified file', function (done) {
      gulp
        .src(getFixtures('*'))
        .pipe(minifyPipeline.minifyJS({addSourceMaps: false, concat: true}))
        .pipe(assert.length(1))
        .pipe(assert.end(done));
    });

    it('Should output the same number of files minified', function (done) {
      gulp
        .src(getFixtures('*'))
        .pipe(minifyPipeline.minifyJS({addSourceMaps: false, concat: false}))
        .pipe(assert.length(2))
        .pipe(assert.end(done));
    });

    it('Should output the same number of files minified and the map for each one', function (done) {
      gulp
        .src(getFixtures('*'))
        .pipe(minifyPipeline.minifyJS({addSourceMaps: true, concat: false}))
        .pipe(assert.length(4))
        .pipe(assert.end(done));
    });

    it('Should output custom min and map files', function (done) {
      var customFilename = 'test/filename.js';

      gulp
        .src(getFixtures('*'))
        .pipe(minifyPipeline.minifyJS({
          addSourceMaps: true,
          concat: true,
          concatFilename: customFilename
        }))
        .pipe(assert.length(2))
        .pipe(assert.first(function (file) {
          var path = customFilename + '.map';
          expect(file.relative.toString()).to.equal(path);
        }))
        .pipe(assert.last(function (file) {
          expect(file.relative.toString()).to.equal(customFilename);
        }))
        .pipe(assert.end(done));
    });
  });

});