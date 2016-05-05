'use strict';

function Touchend() {
    return function(scope, element, attr) {

        element.on('touchend', function(event) {
            scope.$apply(function() { 
                scope.$eval(attr.ngTouchend); 
            });
        });
    };
}


// love our dependency injection and we are now safe from obfuscation
Touchend.$inject = [];

module.exports = Touchend;