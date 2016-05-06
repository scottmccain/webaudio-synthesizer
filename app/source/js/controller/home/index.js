'use strict';
 
function HomeController(alertify) {
    
    var vm = this;
    
    
    vm.mod = {};
    
    vm.mod.frequency = 0;
    vm.mod.osc1Tremlo = 0;
    vm.mod.shape = null;
    
    
    vm.mod.waveshapes = [{name: "sine", value: 0}, {name: "square", value: 1}, {name:"saw", value: 2}, {name:"triangle", value: 3}];
    
    vm.updateVoices = function() {
        console.log('frequency: ', vm.mod.frequency);
    };
}

// love our dependency injection and we are now safe from obfuscation
HomeController.$inject = ['alertify'];

module.exports = HomeController;
