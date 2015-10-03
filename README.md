## Pipeline-minify-js


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| Pipeline-minify-js| This pipeline concatenates and minifies js files | 0.1.0 |

# Overview


_repo_: `ssh:git@github.com:kenzanmedia/pipeline-minify-js.git`

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

    + __config.concatenate:__ If _false_ the pipeline won't concatenate the files, hence it won't generate a js file e the files using `jscsrc`. You might want to disable JSCS if working on a legacy project. Otherwise this option should _false_.

    + __config.output:__ Sets the path to output the concatenate and minify files.


  Default:
  ```javascript
  config = {
        concatenate: true,
        output: 'dist/'  
      }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to minify, and you can call the _minifyJS_ method to execute the minification. Based on the configuration provided in _config.concatenate_, the pipeline will concatenate the files or no. After finishing the process you will have a folder named as _config.output_ . In this folder you can find the .min.js file, the source map, and a plain js file if the concatenation was executed. 




## LICENSE
