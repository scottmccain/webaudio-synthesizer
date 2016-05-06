'use strict';
var app = require('angular').module('angular-application');

app.directive('wcKnob', require('./wcKnob'));
app.directive('wcSlider', require('./wcSlider'));
app.directive('ngTouchend', require('./ngTouchend'));
app.directive('ngTouchstart', require('./ngTouchstart'));
app.directive('backImg', require('./backImage'));
app.directive('ngDropdown', require('./dropdown'));