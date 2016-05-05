'use strict';

function log2(num) {
	var log=Math.log(num) / Math.LN2;
	return log;
} 

function WebaudioKnob($parse, $log, viewUrl) {
 return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            defaultText: '@',
            displayProperty: '@',
            min: '@',
            max: '@',
            units: '@',
            defvalue: '@',
            step: '@',
            width: '@',
            height: '@',
            knobwidth: '@',
            knobheight: '@',
            ditchLength: '@',
            src: '@',
            knobsrc: '@',
            direction: '@',
            valuetip: '@',
            sensitivity: '@',
            tooltip: '@',
            enable: '@',            
            onChange: '&'
        },
        templateUrl: viewUrl('partials/templates/web-knob/index.html'),
        bindToController: true,
        controllerAs: 'vm',
        controller: function () {
            var self = this;
 
            self.valuedisp = log2(56);
        },
        link: function(scope, elem, attrs, ngModelCtrl) {     
            
			var pointermove = function(e) {
			    
			    $log.debug('pointermove.this', this);
			    
				if(e.touches)
					e = e.touches[0];
				if(this.lastShift !== e.shiftKey) {
					this.lastShift = e.shiftKey;
					this.startPosX = e.pageX;
					this.startPosY = e.pageY;
					this.startVal = this.value;
				}
				var offset = (this.startPosY - e.pageY - this.startPosX + e.pageX) * this.sensitivity;
				if(this.setValue(this.min + ((((this.startVal + (this.max - this.min) * offset / ((e.shiftKey ? 4:1) * 128)) - this.min) / this.ctlStep)|0) * this.ctlStep))
					this.fire('change');
				e.preventDefault();
			};
			
            
            var knb = elem[0].querySelector('#wac-knob');
            $log.debug('knb: ', knb);
            
            knb.addEventListener('click', function() {
                $log.debug('clicked!');
            });
            
            ngModelCtrl.$render = function () {
                //scope.vm.selectValueByModel(ngModelCtrl.$viewValue);
            };

            scope.$watch('vm.modelValue', function () {
                ngModelCtrl.$setViewValue(scope.vm.modelValue);

                if (typeof (scope.vm.onChange) === 'function') {
                    scope.vm.onChange();
                }
            });
        }
    };
}

// love our dependency injection and we are now safe from obfuscation
WebaudioKnob.$inject = ['$parse', '$log', 'viewUrl'];

module.exports = WebaudioKnob;