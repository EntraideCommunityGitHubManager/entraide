angular.module("entraide").factory("AnimService", function($rootScope, $state){

    var animService = {
        routingConfig : {includes:[],excludes:[]},
        transitionConfig: {
            type: 'parallelogram',
            delay: 1000,
            transitionning: false,
            transition: null
        },
        getTransitionConfig: function(){
            return this.transitionConfig;
        },
        getRoutingConfig: function(){
            return this.routingConfig;
        },
        setTransitionConfig: function(routingConfig){
            this.routingConfig = routingConfig;
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
            }, delay ? delay : 1500);
        },
        isTransitionnable : function(t, params) {
            var config = this.getRoutingConfig();
            for(var i= 0; i < config.excludes.length; i++){
				if(config.excludes[i]==params.targetState){
					return false;
				}
			}
			
			for(var i= 0; i < config.includes.length; i++){
				var fromRule = config.includes[i].from;
				var toRule = config.includes[i].to;
				
				var fromStar = false;
				var toStar = false;
				
				if(fromRule.indexOf('*')>=0){
					fromRule = fromRule.replace('*','');
					fromStar = true;
				}
				
				if(toRule.indexOf('*')>=0){
					toRule = toRule.replace('*','');
					toStar = true;
				}
				
				if(fromStar){
					if(t.fromState.name.indexOf(fromRule)>=0){
						if(toStar){
							if(t.toState.name.indexOf(toRule)>=0){
								return true;
							}
						} else {
							if(t.toState.name == toRule){
								return true;
							}
						}
					}
					
				} else {
					if(t.fromState.name == fromRule){
						if(toStar){
							if(t.toState.name.indexOf(toRule)>=0){
								return true;
							}
						} else {
							if(t.toState.name == toRule){
								return true;
							}
						}
					}
				}
			}
			return false;

        }

    };

    return animService;
});
