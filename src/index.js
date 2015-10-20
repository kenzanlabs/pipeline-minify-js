/*global require, module */

'use strict';

var args = require('yargs').argv;
var handyman = require('pipeline-handyman');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});

var config = {
  concat: true,
  output: 'dest/'
};

module.exports = buildPipeline;

function buildPipeline(options) {

  if (config) {
    config = handyman.updateConf(config, options);
  }

  var pipeline = {
    minifyJS: minifyJS()
  };

  return pipeline;

  function minifyJS() {

    return lazypipe()
      .pipe(function () {
        return plugins.if(args.verbose, plugins.print());
      })
      .pipe(plugins.sourcemaps.init)
      .pipe(concatJS())
      .pipe(plugins.uglify)
      .pipe(plugins.rename, 'build.min.js')
      .pipe(plugins.sourcemaps.write, './')
      .pipe(gulp.dest, config.output);
  }

  function concatJS() {
    var bypass = lazypipe();
    var concat = lazypipe()
      .pipe(plugins.concat, 'build.js')
      .pipe(gulp.dest, config.output);

    return config.concat ? concat : bypass;
  }
}
