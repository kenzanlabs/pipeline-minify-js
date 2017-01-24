'use strict';

const assert = require('stream-assert');
const expect = require('chai').expect;
const gulp = require('gulp');
const handyman = require('pipeline-handyman');
const minifyPipeline = require('../src/index.js');
const path = require('path');

function getFixtures(glob) {
  return path.join(__dirname, 'fixtures', glob);
}

describe('pipeline-minify-js', () => {

  describe('Default Configuration', () => {
    it('Should output two files after concatenation; Minified file and sourcemap', (done) => {
      gulp
        .src(getFixtures('./es5/*'))
        .pipe(minifyPipeline.minifyJS())
        .pipe(assert.length(2))
        .pipe(assert.first((file) => {
          const filename = handyman.getPackageName() + '.min.js.map';

          expect(file.relative.toString()).to.equal(filename);
        }))
        .pipe(assert.last((file) => {
          expect(file.relative.toString()).to.equal(handyman.getPackageName() + '.min.js');
        }))
        .pipe(assert.end(done));
    });
  });

  describe('User specific configurations', () => {
    it('Should generate only the minified file', (done) => {
      gulp
        .src(getFixtures('./es5/*'))
        .pipe(minifyPipeline.minifyJS({addSourceMaps: false, concat: true}))
        .pipe(assert.length(1))
        .pipe(assert.end(done));
    });

    it('Should output the same number of files minified', (done) => {
      gulp
        .src(getFixtures('./es5/*'))
        .pipe(minifyPipeline.minifyJS({addSourceMaps: false, concat: false}))
        .pipe(assert.length(2))
        .pipe(assert.end(done));
    });

    it('Should output the same number of files minified and the map for each one', (done) => {
      gulp
        .src(getFixtures('./es5/*'))
        .pipe(minifyPipeline.minifyJS({addSourceMaps: true, concat: false}))
        .pipe(assert.length(4))
        .pipe(assert.end(done));
    });

    it('Should output custom min and map files', (done) => {
      const customFilename = 'test/filename.js';

      gulp
        .src(getFixtures('./es5/*'))
        .pipe(minifyPipeline.minifyJS({
          addSourceMaps: true,
          concat: true,
          concatFilename: customFilename
        }))
        .pipe(assert.length(2))
        .pipe(assert.first((file) => {
          const path = customFilename + '.map';

          expect(file.relative.toString()).to.equal(path);
        }))
        .pipe(assert.last((file) => {
          expect(file.relative.toString()).to.equal(customFilename);
        }))
        .pipe(assert.end(done));
    });

    it('should check for es6 options with correct config option', (done) => {
      const customFilename = 'test/filename.js';

      gulp
        .src(getFixtures('./es6/*'))
        .pipe(minifyPipeline.minifyJS({
          es6: true,
          addSourceMaps: true,
          concat: true,
          concatFilename: customFilename
        }))
        .pipe(assert.first((file) => {
          const path = customFilename + '.map';

          expect(file.relative.toString()).to.equal(path);
        }))
        .pipe(assert.last((file) => {
          expect(file.relative.toString()).to.equal(customFilename);
        }))
        .pipe(assert.end(done));
    });

  });
});