'use strict';
 
function WebaudioKnob($parse) {
 return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            type: '@',
            defaultText: '@',
            displayProperty: '@',
            onChange: '&',
            dropdownItems: '='
        },
        template:
                    '<div class="btn-group" uib-dropdown is-open="status.isopen"> ' +
                      '<button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle ng-disabled="disabled"> ' +
                        '{{vm.selectedValue == null ? vm.defaultText : vm.selectedValue.display}} <span class="caret"></span> ' +
                      '</button>' +
                      '<ul class="dropdown-menu" uib-dropdown-menu role="menu" aria-labelledby="single-button"> ' +
                        '<li role="menu-item" ' +
                            'ng-repeat="item in vm.items" ng-class="item.classes"> ' +
                                '<a class="link-primary tabindex="-1" href="" ' +
                                    'ng-click="vm.selectValue(item)">{{item.display}}</a>' +
                        '</li>' +
                      '</ul>' +
                    '</div>',
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

                if (controller.dropdownItems === null) {
                    return;
                }

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

// love our dependency injection and we are now safe from obfuscation
WebaudioKnob.$inject = ['$parse'];

module.exports = WebaudioKnob;