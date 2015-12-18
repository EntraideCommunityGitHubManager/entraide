Events = new Mongo.Collection("events");

Meteor.publish("all-events", function(){
    if(isAdmin(this.userId)){
        return Events.find({}, {sort: {name:1}});
    } else {
        this.stop();
        return;
    }
});

Meteor.publish("my-events", function(){
    return Events.find({'owner.id' :  this.userId, removed:false}, {sort: {name:1}});
});

Meteor.publish("search-events", function(options){
    options.collectionOptions = options.collectionOptions ? options.collectionOptions : {'department.code' : "74"};
    options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:100};
    var arrOptions = [{'owner.id': { $ne: this.userId }, removed:false}];
    arrOptions.push(options.collectionOptions);
    return Events.find({$and: arrOptions}, options.sortLimitOptions);
});

Events.deny({
    insert: function (userId, event) {
        return !isAdmin(userId);
    },
    update: function (userId, event, fields, modifier) {
        return !isAdmin(userId);
    },
    remove: function (userId, event) {
        return !isAdmin(userId);
    }
});

Meteor.methods({
    event_create: function(e){
        var event  = {owner:{id:this.userId}, createdAt: Date.now(), removed:false};
        event.department = Departments.findOne({code: e.department.code});;
        event.location = {longitude:setFloatValue(e.location.longitude), latitude:setFloatValue(e.location.latitude)};
        event.name = setStringValue(e.name, 100);
        event.description = setStringValue(e.description, 5000);
        event.startDate = setDateValue(e.startDate);
        return Events.insert(event);
    },
    event_update: function(e){
        console.log('event_update called')
        var event = Events.findOne({_id:e._id, 'owner.id':this.userId});
        if(event){
            return Events.update({_id: event._id}, {$set: {description:setStringValue(e.description, 5000), updatedAt: Date.now()}});
        }    
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not update this event');
    },
    event_remove: function (eventId) {
        var event = Events.findOne({_id:eventId, 'owner.id':this.userId});
        if(event){
            if(isAdmin(this.userId) || event.owner.id == this.userId){
                return Events.update({_id: eventId}, {$set: {removed:true, removedAt: Date.now()}});}
        }
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not remove this event');
    }
});



EventSkills = new Mongo.Collection("event_skills");

Meteor.publish("event-skills", function(options){
    if(options && options.collectionOptions && options.collectionOptions.event && options.collectionOptions.event.id){
        options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:1};
        var arrOptions = [{'owner.id': this.userId}];
        arrOptions.push(options.collectionOptions);
        return EventSkills.find({$and: arrOptions}, options.sortLimitOptions);
    } else {
        this.stop();
        return;
    }
});

EventSkills.deny({
    insert: function (userId, eventSkill) {
       return !isAdmin(userId);
    },
    update: function (userId, eventSkill, fields, modifier) {
        return !isAdmin(userId);
    },
    remove: function (userId, eventSkill) {
        return !isAdmin(userId);
    }
});


Meteor.methods({
    event_skill_create: function(skill){
        var eventSkill  = {owner:{id:this.userId}, createdAt: Date.now(), removed:false};
        eventSkill.event = {id:Events.findOne({_id:skill.event.id,'owner.id':this.userId})._id};
        eventSkill.category = {code:Categories.findOne({code: skill.category.code}).code};
        eventSkill.level = checkRange(0,5,skill.level);
        return EventSkills.insert(eventSkill);
    },
    event_skill_update: function(skill){
        var eventSkill = EventSkills.findOne({_id:skill._id, 'owner.id':this.userId});
        if(eventSkill){
            return EventSkills.update({_id: skill._id}, {$set: {level:checkRange(0,5,skill.level), updatedAt: Date.now()}});
        }    
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not update this event skill');
    },
    event_skill_remove: function (skillId) {
        var eventSkill = EventSkills.findOne({_id:skillId, 'owner.id':this.userId});
        if(eventSkill){
            return EventSkills.remove(skillId);
        }
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not remove this event skill');
    }
});
