'use strict';

const concat = require('gulp-concat');
const gulpIf = require('gulp-if');
const handyman = require('pipeline-handyman');
const lazypipe = require('lazypipe');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const babel = require('gulp-babel');

let config = {
  addSourceMaps: true,
  concat: true,
  concatFilename: handyman.getPackageName() + '.min.js',
  concatOutput: '.',
  plugins: {
    uglify: {}
  },
  es6: false
};

module.exports = {
  minifyJS: (options) => {
    if (options) {
      Object.assign(config, options);
      handyman.log(`Minifying with custom options, ES6 => ${config.es6}`);
    }
    return pipelineFactory();
  }
};

function pipelineFactory() {
  const stream = lazypipe()
    .pipe(() => {
      return gulpIf(config.addSourceMaps, sourcemaps.init());
    })
    .pipe(() => {
      return config.es6 ? babel({presets: ['babili']}) : uglify(config.plugins.uglify);
    })
    .pipe(() => {
      return config.concat ? concat(config.concatFilename) : rename({extname: '.min.js'});
    })
    .pipe(() => {
      return gulpIf(config.addSourceMaps, sourcemaps.write(config.concatOutput));
    });

  return stream();
}
