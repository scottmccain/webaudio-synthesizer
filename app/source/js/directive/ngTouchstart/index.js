'use strict';

function Touchstart() {
    return function(scope, element, attr) {

        element.on('touchstart', function(event) {
            scope.$apply(function() { 
                scope.$eval(attr.ngTouchstart); 
            });
        });
    };
}


// love our dependency injection and we are now safe from obfuscation
Touchstart.$inject = [];

module.exports = Touchstart;