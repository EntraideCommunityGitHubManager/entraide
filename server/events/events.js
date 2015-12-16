Events = new Mongo.Collection("events");

/*  ADMIN Allow  */
Events.allow({
    insert: function (userId, event) {
       return isAdmin(userId);
    },
    update: function (userId, event, fields, modifier) {
        return isAdmin(userId);
    },
    remove: function (userId, event) {
        return isAdmin(userId);
    }
});

/*  HELPER Allow  */
Events.allow({
    insert: function (userId, event) {
        var msg = 'failed';
        if(event.location && event.location.longitude && event.location.latitude && !isNaN(parseFloat(event.location.longitude)) !isNaN(parseFloat(event.location.latitude)) && !isNaN(parseInt(event.startDate)) ){
           if(event.owner.id !== userId){
               msg = 'HACKING failed';
           } else {
               return true
           }
        }
        console.log('Event Allow insert '+msg+' [user:'+userId+']: ' + event);
        return false;
    },
    update: function (userId, event, fields, modifier) {
        return userId && event.owner.id === userId;
    },
    remove: function (userId, event) {
        return userId && event.owner.id === userId;
    }
});

/*  HELPER Deny  */
Events.deny({
    update: function (userId, event, fields, modifier) {
        return !isAdmin(userId);
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





EventSkills = new Mongo.Collection("event_skills");

/*  ADMIN Allow  */
EventSkills.allow({
    insert: function (userId, eventSkill) {
       return isAdmin(userId);
    },
    update: function (userId, eventSkill, fields, modifier) {
        return isAdmin(userId);
    },
    remove: function (userId, eventSkill) {
        return isAdmin(userId);
    }
});

/*  HELPER Allow  */
EventSkills.allow({
    insert: function (userId, skill) {
         return skill.owner.id === userId;
    },
    update: function (userId, skill, fields, modifier) {
        return skill.owner.id === userId;
    },
    remove: function (userId, skill) {
        return skill.owner.id === userId;
    }
});

