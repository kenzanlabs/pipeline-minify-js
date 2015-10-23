'use strict';

var gulp = require('gulp');
//var minifyPipeline = require('./src/index.js')();
var testPipeline = require('pipeline-test-node')();
var validatePipeline = require('pipeline-validate-js')();

var config = {
  jsFiles: [
    '*/.js',
    'src/**/*.js',
    'test/**/*.js'
  ]
};

gulp.task('build', function() {
  return gulp
    .src(config.jsFiles)
    .pipe(validatePipeline.validateJS())
    .pipe(testPipeline.test());
    //.pipe(minifyPipeline.minifyJS());
});