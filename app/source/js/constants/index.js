'use strict';
var app = require('angular').module('angular-application');

app.constant('viewUrl', function(relativePath) {
    return '/views' + relativePath ;
});
