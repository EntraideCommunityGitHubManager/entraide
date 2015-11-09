angular.module("entraide").factory("AnimService", function($rootScope){

    var animService = {
        startTransition : function(delay){
            setTimeout(function(){$rootScope.$broadcast('anim-transition-start');}, delay ? delay : 1000);
        },
        stopTransition : function(delay) {
            setTimeout(function(){$rootScope.$broadcast('anim-transition-stop');}, delay ? delay : 2000);
        }
    };

    return animService;
});
