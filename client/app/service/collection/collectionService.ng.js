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
            var subscribtion = _.findWhere(this.subscriptions, {id:subscriptionId});
            if(!subscribtion.handle) {
                
                this.startHandle(subscription).then(function(){
                    deferred.resolve(subscribtion);
                });
            } else {
                deferred.resolve(subscribtion);
            }
            return deferred.promise;
        },

        startHandle: function(sub){
            return $meteor.subscribe(sub.sub).then(function(handle) {
                sub.handle = handle;
            });
        },

        stopHandle : function (sub) {
            sub.handle.stop();
            sub.handle = undefined;
        }
    };

    return collectionService;
});
