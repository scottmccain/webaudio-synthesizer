var angular = require('angular');

require('angular-ui-router');

// bring in some angular global namespaces for injection
require('angular-router-browserify')(angular);
require('angular-bootstrap-npm');
require('ngalertify');
require('angular-animate');

require('./audiolib');



var app = angular.module('angular-application', ['ui.router', 'ui.bootstrap', 'ngAlertify', require('angular-resource'), 'ngAnimate']);


app.constant('viewUrl', function(relativePath) {
    return '/views' + relativePath ;
});


app.config(require('./route'));

//require('./route');
require('./service');
require('./controller');

// get required components
require('./factory');
require('./directive');