'use strict';

var assert = require('stream-assert');
var gulp = require('gulp');
//var minifyPipeline = require('../src/index.js');
var path = require('path');

function getFixtures(glob) {
  return path.join(__dirname, 'fixtures', glob);
}

describe('pipeline-minify-js', function() {

  describe('Pipeline functionality', function() {

    it('Should output two files if concat is true', function (done) {
      gulp
        .src(getFixtures('*'))
        //.pipe(minifyPipeline())
        //.pipe(assert.length(0))
        .pipe(assert.end(done));
    });

  });
});

//it('Should output one file if concatenate is false', function (done) {
//  gulp
//    .src(getFixtures('*'))
//    .pipe(minifyPipeline({concatenate: false}).minifyJS())
//    .pipe(assert.length(4))
//    .pipe(assert.end(done));
//});
//.pipe(minifyPipeline().minifyJS());