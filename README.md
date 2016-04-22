## pipeline-minify-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-minify-js| This pipeline minifies and optionally concatenates js files | 0.4.0 |

# Overview

Gulp pipeline for minifiying JS and optionally concatenating the output.

**NOTE: as this project is still pre 1.0.0, it is subject to possible backwards incompatible changes as it matures.
Also, as part of a repo migration, version 0.2.0 will not install, so please use any of the newer versions**

## Install

`npm install pipeline-minify-js --save-dev`

## Usage
```javascript
var gulp = require('gulp');
var minifyPipeline = require('pipeline-minify-js');


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(minifyPipeline.minifyJS())
    .pipe(gulp.dest('dist'));
});

// task with options
gulp.task('optns', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(minifyPipeline.minifyJS({concat: false}))
    .pipe(gulp.dest('dist'));
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

  * __addSourceMaps:__ If set to __false__ source maps won't be generated for the compile files. By default the pipeline will generate the source maps and store them in _maps_.

  * __concat:__ If _false_ the pipeline won't concatenate the files into a single generated file

  * __concatFilename:__ Sets the filename of the concatenated files.
    
  * __concatOutput:__ Sets the path to where the sourcemaps are written to
    
  * __uglify:__ Uglifies JS files using the basic [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) configuration.
    


  Default:
  ```javascript
  config = {
    addSourceMaps: true,
    concat: true,
    concatFilename: '{package-name}.min.js',
    concatOutput: 'dest/',
    uglify: {}  //default options
  }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to minify, and you can call the _minifyJS_ method to execute the minification. Based on the configuration provided in _config.concatenate_, the pipeline will concatenate the files or no. After finishing the process you will have a folder named as _config.output_ . In this folder you can find the .min.js file, the source map, and a plain js file if the concatenation was executed.



## LICENSE
Copyright 2015 Kenzan, LLC <http://kenzan.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.