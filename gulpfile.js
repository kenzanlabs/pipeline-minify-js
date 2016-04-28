'use strict';

var del = require('del');
var gulp = require('gulp');
var minifyPipeline = require('./src/index.js');
var testPipeline = require('pipeline-test-node')();
var validatePipeline = require('pipeline-validate-js')();

var config = {
  jsFiles: [
    '*/.js',
    'src/**/*.js',
    'test/**/*.js'
  ]
};

gulp.task('clean', function () {
  return del.sync([
    './dest/**'
  ]);
});

gulp.task('validate', function() {
  return gulp
    .src(config.jsFiles)
    .pipe(validatePipeline.validateJS())
    .pipe(testPipeline.test());
});

gulp.task('build', ['clean', 'validate'] , function() {

  return gulp
    .src(config.jsFiles)
    .pipe(minifyPipeline.minifyJS());
});