'use strict';

var handyman = require('pipeline-handyman');
var setName = function (id, name) {
  return {
    id: id,
    name: name
  };
};

handyman.log('FILE 1');
setName(1, 'Jon');