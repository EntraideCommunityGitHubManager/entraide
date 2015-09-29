angular.module("entraide").factory("CollectionService", function($meteor, $q){

    var collectionService = {
        subscriptions : [{
                name: "Search events by profile",
                id: "search-events",
                unsubscribers: ['my-events'],
                handle: null
            }, {
                name: "My events",
                id: "my-events",
                unsubscribers: ['search-events'],
                handle: null
            }],

        get : function(subscriptionId) {
            var deferred = $q.defer();
            var subscription = _.findWhere(this.subscriptions, {id:subscriptionId});
            angular.forEach(subscription.unsubscribers,function(unsubscriptionId){this.stopHandle(_.findWhere(this.subscriptions, {id:unsubscriptionId}));});
            if(!subscription.handle) {
                this.startHandle(subscription).then(function(){
                    deferred.resolve(subscription);
                });
            } else {
                deferred.resolve(subscription);
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
            console.log("Try to unsubscribe from "+sub.id);
            if(sub && sub.handle){
                sub.handle.stop();
                sub.handle = null;
                console.log("Success UnSubscription : "+sub.id);
            }
        }
    };

    return collectionService;
});
