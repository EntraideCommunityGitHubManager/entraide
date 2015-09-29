Events = new Mongo.Collection("events");

Events.allow({
    insert: function (userId, event) {
        console.log(userId);
        console.log(event.owner._id);
        return userId && event.owner.id === userId;
    },
    update: function (userId, event, fields, modifier) {
        return userId && event.owner.id === userId;
    },
    remove: function (userId, event) {
        console.log(userId);
        console.log(event.owner.id);
        return userId && event.owner.id === userId;
    }
});

Meteor.startup(function () {

    if (Events.find().count() === 0) {
        var events = [
            {
                'name': 'Dubstep-Free Zone',
                'description': 'Can we please just for an evening not listen to dubstep.',
                'region': {'id':1},
                'owner': {'id':'4dGszrrxzKnB47GCz'}
            },
            {
                'name': 'All dubstep all the time',
                'description': 'Get it on!',
                'region': {'id':1},
                'owner': {'id':'4dGszrrxzKnB47GCz'}
            },
            {
                'name': 'Savage lounging',
                'description': 'Leisure suit required. And only fiercest manners.',
                'region': {'id':1},
                'owner': {'id':'4dGszrrxzKnB47GCz'}
            }
        ];
        for (var i = 0; i < events.length; i++)
            Events.insert(events[i]);
    }
    
    Meteor.publish("my-events", function(){
        console.log("my-events");
        console.log(this.userId);
    	return Events.find({'owner.id' :  this.userId}, {sort: {name:1}});
    });
    
    Meteor.publish("search-events", function(options){
        console.log("search-events");
    	options.collectionOptions = options.collectionOptions ? options.collectionOptions : {'region.id' : 1};
    	options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:100};
    	var arrOptions = [{'owner.id': { $ne: this.userId }}];
    	arrOptions.push(options.collectionOptions);
    	return Events.find({$and: arrOptions}, options.sortLimitOptions);
    });


});
