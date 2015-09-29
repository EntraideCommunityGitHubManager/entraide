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
            var subscription = _.findWhere(this.subscriptions, {id:subscriptionId});
            if(subscription){
                angular.forEach(subscription.unsubscribers,function(unsubscriptionId){this.stopHandle(_.findWhere(this.subscriptions, {id:unsubscriptionId}));});
                if(!subscription.handle) {
                    this.startHandle(subscription).then(function(handle){
                        deferred.resolve($meteor.collection(subscription.collection));
                    });
                } else {
                    deferred.resolve($meteor.collection(subscription.collection));
                }
            } else {
                deferred.reject("Subcription " + subscriptionId +" does not exist");    
            }
            return deferred.promise;
        },

        startHandle: function(sub){
            console.log("Try to subscribe to "+sub.id);
            return $meteor.subscribe(sub.id).then(function(handle) {
                console.log("Success subscription : "+sub.id);
                sub.handle = handle;
            });
        },

        stopHandle : function (sub) {
            if(sub && sub.handle){
                console.log("Try to unsubscribe from "+sub.id);
                sub.handle.stop();
                sub.handle = null;
                console.log("Success UnSubscription : "+sub.id);
            }
        }
    };

    return collectionService;
});
