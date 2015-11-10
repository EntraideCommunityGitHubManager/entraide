angular.module("entraide").factory("AnimService", function($rootScope, $state){

    var animService = {
        transitionConfig: {
            type: 'parallelogram',
            delay: 1000,
            transitionning: false,
            transition: null
        },
        getTransitionConfig: function(){
            return this.transitionConfig;
        },
        isTransitionning: function(){
            return this.transitionConfig.transitionning;
        },
        isNotCurrent: function(transition){
            return !angular.equals(transition, this.transitionConfig.transition);
        },
        startTransition : function(transition, type){
            console.log('AnimService.starTransition called');
            var service = this;
            service.transitionConfig.transition = transition;
            service.transitionConfig.type = type ? type : service.transitionConfig.type;
            service.transitionConfig.transitionning = true;
            $rootScope.$broadcast('anim-transition-start');
            setTimeout(function(){
                console.log('AnimService.transitionConfig.transitionning : false');
                service.transitionConfig.transitionning = false;
            }, service.transitionConfig.delay);

        },
        stopTransition : function(delay) {
            console.log('AnimService.stopTransition called');
        	this.transitionConfig.transition = null;
        	this.transitionConfig.transitionning = false;
            setTimeout(function(){
                $rootScope.$broadcast('anim-transition-stop');
            }, delay ? delay : 1000);
        }

    };

    return animService;
});
