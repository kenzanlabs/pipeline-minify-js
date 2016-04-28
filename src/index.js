'use strict';

var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var handyman = require('pipeline-handyman');
var lazypipe = require('lazypipe');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var config = {
  addSourceMaps: true,
  concat: true,
  concatFilename: handyman.getPackageName() + '.min.js',
  concatOutput: '.',
  plugins: {
    uglify: {}
  }
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
      .pipe(function () {
        return gulpIf(config.addSourceMaps, sourcemaps.init());
      })
      .pipe(uglify, config.plugins.uglify)
      .pipe(function () {
        return gulpIf(!config.concat, rename({extname: '.min.js'}));
      })
      .pipe(function () {
        return gulpIf(config.concat, concat(config.concatFilename));
      })
      .pipe(function () {
        return gulpIf(config.addSourceMaps, sourcemaps.write(config.concatOutput));
      });
  }
}

