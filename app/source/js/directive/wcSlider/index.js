'use strict';

function log2(num) {
	var log=Math.log(num) / Math.LN2;
	return log;
} 

function WebControlSlider($parse, $log, $timeout, $window, viewUrl) {
 return {
        restrict: 'E',
        scope: {
            onChange: '&'
        },
        templateUrl: viewUrl('/partials/templates/web-slider/index.html'),
        bindToController: true,
        controllerAs: 'vm',
        controller: function () {
        },
        link: function(scope, elem, attrs, ngModelCtrl) {     
        
        }
    };
}

// love our dependency injection and we are now safe from obfuscation
WebControlSlider.$inject = ['$parse', '$log', '$timeout', '$window', 'viewUrl'];

module.exports = WebControlSlider;