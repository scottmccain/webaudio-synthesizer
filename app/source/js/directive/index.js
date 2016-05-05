'use strict';
var app = require('angular').module('angular-application');

app.directive('webaudioKnob', require('./webaudioKnob'));
app.directive('ngTouchend', require('./ngTouchend'));
app.directive('ngTouchstart', require('./ngTouchstart'));
app.directive('backImg', require('./backImage'));