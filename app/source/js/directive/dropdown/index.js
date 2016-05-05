'use strict';

function directive($parse, viewUrl) {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            type: '@',
            defaultText: '@',
            displayProperty: '@',
            onChange: '&',
            dropdownItems: '=items'
        },
        templateUrl: viewUrl('/partials/templates/dropdown/index.html'),
        bindToController: true,
        controllerAs: 'vm',
        controller: function () {
            var self = this;
 
            self.items = [];
            self.classes = {};
 
            self.selectValue = function (value) {
                self.selectedValue = value;
                self.modelValue = self.selectedValue.wrapped;
            };
 
            self.addItem = function (item) {
                self.items.push(item);
            };
 
            self.selectValueByModel = function(model) {
                if(self.items === null) return;
                for (var i = 0; i < self.items.length; i++) {
                    var item = self.items[i];
 
                    if (item.wrapped == model) {
                        self.selectedValue = item;
                        return;
                    }
                }
 
                self.selectedValue = null;
            };
 
            self.clear = function () {
                self.items = [];
                self.modelValue = null;
                self.selectedValue = null;
            };
        },
        link: function(scope, elem, attrs, ngModelCtrl) {        
            function bindController() {
                var controller = scope.vm;

                controller.clear();

                console.log('items: ', controller.dropdownItems);
                
                if (controller.dropdownItems === null) {
                    return;
                }

                if (!controller.dropdownItems) return;
                
                for (var i = 0; i < controller.dropdownItems.length; i++) {

                    var wrapped = controller.dropdownItems[i];
                    var $item = {};

                    $item.display = wrapped[controller.displayProperty];
                    $item.wrapped = wrapped;
                    controller.addItem($item);
                }

                controller.selectValueByModel(ngModelCtrl.$viewValue);
            }
 
            ngModelCtrl.$render = function () {
                scope.vm.selectValueByModel(ngModelCtrl.$viewValue);
            };

            scope.$watch('vm.dropdownItems', bindController);

            scope.$watch('vm.dropdownItems.length', bindController);

            scope.$watch('vm.modelValue', function () {
                ngModelCtrl.$setViewValue(scope.vm.modelValue);

                if (typeof (scope.vm.onChange) === 'function') {
                    scope.vm.onChange();
                }
            });
        }
    };
}


directive.$inject = ['$parse', 'viewUrl'];

module.exports = directive;