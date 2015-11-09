angular.module("entraide").factory("AnimService", function($rootScope){

    var animService = {
        transition : {
            toState: '',
            fromState: '',
            transitionning: false
        },
        startTransition : function(delay){
            setTimeout(function(){$rootScope.$broadcast('anim-transition-start');}, delay ? delay : 1000);
        },
        stopTransition : function(delay) {
            setTimeout(function(){$rootScope.$broadcast('anim-transition-stop');}, delay ? delay : 2000);
        },
        isTransitionning: function(param){
            return param.toState == this.transition.toState && param.fromState == this.transition.toState && this.transition.transitionning;
        }
    };

    return animService;
});
