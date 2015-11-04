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
            name: "Department by code",
            id: "department-by-code",
            collection: Departments,
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
		if(subscription.handle && subscription.options != options || !subscription.handle){
		    subscription.options = options;
		    this.loadData(subscription, deferred);
		} else {
		    // Return the found collection without reloading
		    if(subscription.typeFS){
		    	deferred.resolve($meteor.collectionFS(subscription.collection));
		    } else {
		        deferred.resolve($meteor.collection(subscription.collection));	
		    }
		}
            } else {
                deferred.reject("Subcription ["+subscriptionId+"] does not exist");    
            }
            return deferred.promise;
        },
		
	loadData: function(subscription, deferred) {
		angular.forEach(subscription.unsubscribers,function(unsubscriptionId){
			var unsubscription = _.findWhere(this.subscriptions, {id:unsubscriptionId});
			if(unsubscription){this.stopHandle(unsubscription);}
		}, this);
		if(subscription.handle){this.stopHandle(subscription);}
		var callback = this.isBackend(subscription.options) ? subscription.collection : function() {return subscription.collection.find(subscription.options.collectionOptions, subscription.options.sortLimitOptions);});
		this.startHandle(subscription).then(function() {
			if(subscription.typeFS){
				deferred.resolve($meteor.collectionFS(callback));
			} else {
				deferred.resolve($meteor.collection(callback));
			}
		});
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
                console.log("Try to unsubscribe from "+sub.id);
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
