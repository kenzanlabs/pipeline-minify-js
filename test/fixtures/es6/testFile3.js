'use strict';

const handyman = require('pipeline-handyman');
const setName = (id, name) => ({id, name});
let var1 = 2;

setName(1, 'Random');
handyman.log(var1);