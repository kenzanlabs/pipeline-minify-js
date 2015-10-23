'use strict';

//var concat = require('gulp-concat');
var gulp = require('gulp');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var config = {
  concat: false,
  output: 'dest/'
};

module.exports = buildPipeline;

function buildPipeline(options) {

  options = options || {};
  config = handyman.mergeConf(config, options);

  var pipeline = {
    minifyJS: minifyJS()
  };

  return pipeline;

  function minifyJS() {

    return lazypipe()
      .pipe(sourcemaps.init)
      .pipe(concatJS)
      .pipe(uglify)
      .pipe(rename, 'build.min.js')
      .pipe(sourcemaps.write, './')
      .pipe(gulp.dest, config.output);
  }

  function concatJS() {
    var bypass = lazypipe();
    var concat = lazypipe()
      .pipe(concat, 'build.js')
      .pipe(gulp.dest, config.output);

    console.log(concat);

    return config.concat ? concat : bypass;
  }
}