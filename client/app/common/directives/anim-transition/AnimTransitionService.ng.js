angular.module("entraide").factory("AnimService", function($rootScope){

    var animService = {
        routingConfig : {includes:[],excludes:[]},
        transitionConfig: {
            animTransitionType: 'wave',
            animTransitionSpinner: 'circles',
            delay: 1000,
            transitioning: false,
            transition: null
        },
        getTransitionConfig: function(){
            return this.transitionConfig;
        },
        getRoutingConfig: function(){
            return this.routingConfig;
        },
        setRoutingConfig: function(routingConfig){
            this.routingConfig = routingConfig;
        },
        setTransitionConfigType : function(type){
            this.transitionConfig.animTransitionType = type;
        },
        setTransitionConfigSpinner : function(spinner){
            this.transitionConfig.animTransitionSpinner = spinner;
        },
        isTransitioning: function(){
            return this.transitionConfig.transitioning;
        },
        isNotCurrent: function(transition){
            return !angular.equals(transition, this.transitionConfig.transition);
        },
        startTransition : function(transition, type){
            console.log('AnimService.startTransition called');
            var service = this;
            service.transitionConfig.transition = transition;
            service.transitionConfig.type = type ? type : service.transitionConfig.type;
            service.transitionConfig.transitioning = true;
            $rootScope.$broadcast('anim-transition-start');
            setTimeout(function(){
                console.log('AnimService.transitionConfig.transitioning : false');
                service.transitionConfig.transitioning = false;
            }, service.transitionConfig.delay);

        },
        stopTransition : function(delay) {
            console.log('AnimService.stopTransition called');
        	this.transitionConfig.transition = null;
        	this.transitionConfig.transitioning = false;
            setTimeout(function(){
                $rootScope.$broadcast('anim-transition-stop');
            }, delay ? delay : 1500);
        },
        isTransitionable : function(t, params) {
            var result = false;
            var config = this.getRoutingConfig();

            for(var i= 0; i < config.includes.length; i++){
                var from = t.fromState.name;
                var to = t.toState.name;

                if(from == to){break;}

                var fromRule = config.includes[i].from;
                var toRule = config.includes[i].to;

                var fromWildcard = false;
                var toWildcard = false;

                if(fromRule.indexOf('*')>=0){
                    fromRule = fromRule.replace('*','');
                    fromWildcard = true;
                }

                if(toRule.indexOf('*')>=0){
                    toRule = toRule.replace('*','');
                    toWildcard = true;
                }

                if(!fromWildcard && toWildcard){
                    if(to.indexOf(toRule)>=0 && from==fromRule){
                        result = true;
                        break
                    }
                }

                if(fromWildcard && !toWildcard){
                    if(from.indexOf(fromRule)>=0 && to==toRule){
                        result = true;
                        break
                    }
                }

                if(!fromWildcard && !toWildcard){
                    if(to==toRule && from==fromRule){
                        result = true;
                        break
                    }
                }

                if(fromWildcard && toWildcard){
                    if(from.indexOf(fromRule)>=0 && to.indexOf(toRule)>=0){
                        result = true;
                        break
                    }
                }

            }

            return result;
        }

    };

    return animService;
});
