angular.module("entraide").factory("CollectionService", function($meteor, $q){

    var collectionService = {
        subscriptions : [{
                name: "Search events by profile",
                id: "search-events",
                collection: Events,
                unsubscribers: ['my-events'],
                handle: null
            }, {
                name: "My events",
                id: "my-events",
                collection: Events,
                unsubscribers: ['search-events'],
                handle: null
            }],

        subscribe : function(subscriptionId, options) {
            var deferred = $q.defer();
            options = this.initOptions(options);
            var subscription = _.findWhere(this.subscriptions, {id:subscriptionId});
            if(subscription){
                angular.forEach(subscription.unsubscribers,function(unsubscriptionId){
                    var unsubscription = _.findWhere(this.subscriptions, {id:unsubscriptionId});
                    if(unsubscription){
                        this.stopHandle(unsubscription);
                    } else {
                        console.log("Unsubcription ["+unsubscriptionId+"] does not exist for the subscription ["+subscriptionId+"]"); 
                    }
                }, this);
                if(!subscription.handle) {
                    if(options.backend){
                        this.startHandle(subscription, options).then(function(handle) {
                            deferred.resolve($meteor.collection(subscription.collection));
                        });
                    } else {
                        this.startHandle(subscription).then(function(handle) {
                            deferred.resolve($meteor.collection(function() {
                                return subscription.collection.find(options.collectionOptions, options.sortLimitOptions);
                            }));
                        });
                    }
                } else {
                    deferred.resolve($meteor.collection(subscription.collection));
                }
            } else {
                deferred.reject("Subcription ["+subscriptionId+"] does not exist");    
            }
            return deferred.promise;
        },

        startHandle: function(sub, options){
            console.log("Try to subscribe to "+sub.id);
            if(options){
                return $meteor.subscribe(sub.id, options).then(function(handle) {
                    console.log("Success subscription : "+sub.id);
                    sub.handle = handle;
                });
            } else {
                return $meteor.subscribe(sub.id).then(function(handle) {
                    console.log("Success subscription : "+sub.id);
                    sub.handle = handle;
                });
            }
            
        },

        stopHandle : function (sub) {
            if(sub && sub.handle){
                console.log("Try to unsubscribe from "+sub.id);
                sub.handle.stop();
                sub.handle = null;
                console.log("Success UnSubscription : "+sub.id);
            }
        },
        
        initOptions: function(options){
            options = options ? options : {collectionOptions:{}, sortLimitOptions:{}, backend:false};
            options.collectionOptions = options.collectionOptions ? options.collectionOptions : {};
            options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {};
            options.backend = options.backend ? options.backend : false;
            return options;
        }
    };

    return collectionService;
});
