'use strict';

const del = require('del');
const gulp = require('gulp');
const minifyPipeline = require('./src/index.js');
const testPipeline = require('pipeline-test-node');
const validatePipeline = require('pipeline-validate-js');
const config = {
  jsFiles: [
    '*/.js',
    'src/**/*.js',
    'test/**/*.js'
  ]
};

gulp.task('clean', () => {
  return del.sync([
    './dest/**'
  ]);
});

gulp.task('validate', () => {
  return gulp
    .src(config.jsFiles)
    .pipe(validatePipeline.validateJS());
});

gulp.task('test', ['validate'],() => {
  return gulp
    .src(config.jsFiles)
    .pipe(testPipeline.test());
});

gulp.task('build', ['clean', 'test'] , () => {
  return gulp
    .src(config.jsFiles)
    .pipe(minifyPipeline.minifyJS({es6: true}));
});