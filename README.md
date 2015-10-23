## Pipeline-minify-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-minify-js| This pipeline minifies and optionally concatenates js files | 0.1.0 |

# Overview


_repo_: `https://github.com/kenzanmedia/pipeline-minify-js/`

_jenkins_: `TODO`

## Install
`npm install git+ssh:git@github.com:kenzanmedia/pipeline-minify-js.git`

## Usage
```javascript
var gulp = require('gulp');
var minifyPipeline = require('pipeline-minify-js')();


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(minifyPipeline.minifyJS());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __config.concat:__ If _true_ the pipeline will concatenate the files, hence it will generate a js file with all of the files concatenated.

    + __config.output:__ Sets the path to output the concatenate and minify files.


  Default:
  ```javascript
  config = {
    concat: false,
    output: 'dist/'  
  }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to minify, and you can call the _minifyJS_ method to execute the minification. Based on the configuration provided in _config.concatenate_, the pipeline will concatenate the files or no. After finishing the process you will have a folder named as _config.output_ . In this folder you can find the .min.js file, the source map, and a plain js file if the concatenation was executed.



## LICENSE
Copyright 2015 Kenzan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.