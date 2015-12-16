Events = new Mongo.Collection("events");

Events.allow({
    insert: function (userId, event) {
        return isAdmin(userId) || userId && event.owner.id === userId;
    },
    update: function (userId, event, fields, modifier) {
        return isAdmin(userId) || userId && event.owner.id === userId;
    },
    remove: function (userId, event) {
        return isAdmin(userId) || userId && event.owner.id === userId;
    }
});

Events.deny({
    update: function (userId, event, fields, modifier) {
        var allowedFields = ['userName','firstName', 'lastName', 'active'];
        return _.difference(fields, allowedFields).length > 0;
    }
});


Meteor.publish("all-events", function(){
    if(isAdmin(this.userId)){
        return Events.find({}, {sort: {name:1}});
    } else {
        this.stop();
        return;
    }
});

Meteor.publish("my-events", function(){
    return Events.find({'owner.id' :  this.userId}, {sort: {name:1}});
});

Meteor.publish("search-events", function(options){
    options.collectionOptions = options.collectionOptions ? options.collectionOptions : {'department.code' : "74"};
    options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:100};
    var arrOptions = [{'owner.id': { $ne: this.userId }}];
    arrOptions.push(options.collectionOptions);
    return Events.find({$and: arrOptions}, options.sortLimitOptions);
});
