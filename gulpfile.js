
'use strict';

var gulp = require('gulp');
var buildPipeline = require('./src/index.js')();
var validatePipeline = require('pipeline-validate-js')();
var testPipeline = require('pipeline-test-node')();

var config = {
  files: [
   'src/**/*.js',
   'test/**/*.js'
  ]
};

gulp.task('test', function (){
  gulp.src(config.files)
    .pipe(testPipeline.test());
});

gulp.task('build', ['test'], function() {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS())
    .pipe(buildPipeline.minifyJS());
});