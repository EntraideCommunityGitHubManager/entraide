angular.module("entraide").factory("AnimService", function($rootScope, $state){

    var animService = {
		transitionConfig: {
			type: 'parallelogram',
			delay: 2000,
			transitionning: false,
			transition: null
		},
		getTransitionConfig: function(){
			return this.transitionConfig;
		}
		isTransitionning: function(){
			return this.transitionConfig.transitionning;
		},
		isNotCurrent: function(transition){
			return !_.equals(transition, this.transitionConfig.transition);
		},
        startTransition : function(transition, type){
			var service = this;
			service.transitionConfig.transition = transition;
			service.transitionConfig.type = type ? type : service.transitionConfig.type;
			service.transitionConfig.transitionning = true;
            $rootScope.$broadcast('anim-transition-start');
			
            setTimeout(function(){
				service.transitionConfig.transitionning = false;
			}, service.transitionConfig.delay);
			
        },
        stopTransition : function(delay) {
            setTimeout(function(){$rootScope.$broadcast('anim-transition-stop');}, delay ? delay : 2000);
        }
    };

    return animService;
});
