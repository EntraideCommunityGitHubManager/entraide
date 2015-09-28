Events = new Mongo.Collection("events");

Events.allow({
    insert: function (userId, event) {
        console.log(userId);
        console.log(event.owner._id);
        return userId && event.owner._id === userId;
    },
    update: function (userId, event, fields, modifier) {
        return userId && event.owner._id === userId;
    },
    remove: function (userId, event) {
        return userId && event.owner._id === userId;
    }
});

Meteor.startup(function () {

    if (Events.find().count() === 0) {
        var events = [
            {
                'name': 'Dubstep-Free Zone',
                'description': 'Can we please just for an evening not listen to dubstep.'
            },
            {
                'name': 'All dubstep all the time',
                'description': 'Get it on!'
            },
            {
                'name': 'Savage lounging',
                'description': 'Leisure suit required. And only fiercest manners.'
            }
        ];
        for (var i = 0; i < events.length; i++)
            Events.insert(events[i]);
    }


    Meteor.publish('events', function() {
        return Events.find({}, {fields: {name: 1, description: 1}});
    });

    Meteor.publish('myevents', function() {
        return Events.find({'owner._id': this.userId}, {fields: {name: 1, description: 1}});
    });

});
