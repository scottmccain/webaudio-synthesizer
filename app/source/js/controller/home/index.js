'use strict';
 
function HomeController(alertify) {
    
    var vm = this;
    
    vm.message = "and Hello from the controller too!";
    alertify.success('Alertify loaded correctly');
}

// love our dependency injection and we are now safe from obfuscation
HomeController.$inject = ['alertify'];

module.exports = HomeController;
