angular.module("entraide").factory("CollectionService", function($meteor, $q){

    var collectionService = {
        subscriptions : [{
            name: "Search all users",
            id: "all-users",
            collection: Meteor.users,
            unsubscribers: [],
            options: null,
            handle: null
        },{
            name: "Search all events",
            id: "all-events",
            collection: Events,
            unsubscribers: ['my-events', 'search-events'],
            options: null,
            handle: null
        }, {
            name: "Search events by profile",
            id: "search-events",
            collection: Events,
            unsubscribers: ['all-events', 'my-events'],
            options: null,
            handle: null
        }, {
            name: "My events",
            id: "my-events",
            collection: Events,
            unsubscribers: ['all-events', 'search-events'],
            options: null,
            handle: null
        }, {
            name: "My event skills",
            id: "event-skills",
            collection: EventSkills,
            unsubscribers: [],
            options: null,
            handle: null
        }, {
            name: "My profile",
            id: "my-profile",
            collection: Profiles,
            unsubscribers: [],
            options: null,
            handle: null
        }, {
            name: "My profile skills",
            id: "profile-skills",
            collection: ProfileSkills,
            unsubscribers: [],
            options: null,
            handle: null
        }, {
            name: "My profile images",
            id: "my-profile-images",
            collection: ProfileImages,
            typeFS: true,
            unsubscribers: [],
            options: {backend:true},
            handle: null
        }, {
            name: "Department by code",
            id: "department-by-code",
            collection: Departments,
            unsubscribers: [],
            options: null,
            handle: null
        }, {
            name: "All departments",
            id: "all-departments",
            collection: Departments,
            unsubscribers: [],
            options: null,
            handle: null
        }, {
            name: "All categories",
            id: "all-categories",
            collection: Categories,
            unsubscribers: [],
            options: null,
            handle: null
        }],

        subscribe : function(subscriptionId, options) {
            var deferred = $q.defer();
            options = this.initOptions(options);
            var subscription = _.findWhere(this.subscriptions, {id:subscriptionId});
            if(subscription){
                // Load data or reload data when options has changed
                if(subscription.handle && !_.isEqual(subscription.options, options) || !subscription.handle){
                    if(subscription.handle){this.stopHandle(subscription);}
                    subscription.options = options;
                    this.loadData(subscription, deferred);
                } else {
                    // Return the found collection without reloading
                    deferred.resolve(this.getCollection(subscription, subscription.collection));
                }
            } else {
                deferred.reject("Subcription ["+subscriptionId+"] does not exist");
            }
            return deferred.promise;
        },
		
        loadData: function(subscription, deferred) {
            var service = this;
            angular.forEach(subscription.unsubscribers,function(unsubscriptionId){
                service.stopHandle(_.findWhere(service.subscriptions, {id:unsubscriptionId}));
            });
            var callback = service.isBackend(subscription.options) ? subscription.collection : function() {return subscription.collection.find(subscription.options.collectionOptions, subscription.options.sortLimitOptions);};
            service.startHandle(subscription).then(function() {
                deferred.resolve(service.getCollection(subscription, callback));
            });
        },

        getCollection: function(sub, callback){
            return sub.typeFS ? $meteor.collectionFS(callback, false, sub.collection) : $meteor.collection(callback, true);
        },

        startHandle: function(sub){
            console.log("Try to subscribe to "+sub.id);
            return $meteor.subscribe(sub.id, this.isBackend(sub.options) ? sub.options : null).then(function(handle) {
                console.log("Success subscription : "+sub.id);
                sub.handle = handle;
            });
        },

        stopHandle : function (sub) {
            if(sub && sub.handle){
                sub.handle.stop();
                sub.handle = null;
                sub.options = null;
                console.log("Success UnSubscription : "+sub.id);
            }
        },

        stopHandlers : function(pattern){
            angular.forEach(this.subscriptions, function(subscription){
                if(subscription.id.indexOf(pattern)>-1){
                    this.stopHandle(subscription);
                }
            }, this);
        },

        stopUserHandlers: function(){
            angular.forEach(this.userSubscriptions, function(){

            });
        },
        
        initOptions: function(options){
            options = options ? options : {collectionOptions:{}, sortLimitOptions:{}, backend:false};
            options.collectionOptions = options.collectionOptions ? options.collectionOptions : {};
            options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {};
            options.backend = options.backend ? options.backend : false;
            return options;
        },
        
        isBackend: function(options){
            return options && options.backend ? true : false;	
        }
    };

    return collectionService;
});
