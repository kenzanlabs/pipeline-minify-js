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

    + __config.concatenate:__ If _false_ the pipelene won't concatenate the files, hence it won't generate a js file e the files using `jscsrc`. You might want to disable JSCS if working on a legacy project. Otherwise this option should _false_.

    + __config.output:__ Sets the path to output the concatenate and minify files.


  Default:
  ```javascript
  config = {
        concatenate: true,
        output: 'dist/'  
      }
  ```  



## Results





## LICENSE
