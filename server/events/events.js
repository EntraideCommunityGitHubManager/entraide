Events = new Mongo.Collection("events");
EventSkills = new Mongo.Collection("event_skills");

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

    var eventsOptions = [{'owner.id': { $ne: this.userId }, removed:false}, options.collectionOptions];

    /* Skills - Categories filter on ids */
    var skillsOptions = [];
    var categoryCodes = [];
    if(options.skillsOptions.length>0){
        for(var i=0; i<options.skillsOptions.length;i++){
            categoryCodes.push(options.skillsOptions[i].code);
        }
        skillsOptions.push({ 'categoryCode': { $in: categoryCodes}});
        var eventSkills = EventSkills.find({$and: skillsOptions}).fetch();
        if(eventSkills.length>0){
            var eventsId = [];
            for(var i=0; i<eventSkills.length;i++){
                eventsId.push(eventSkills[i].eventId);
            }
            eventsOptions.push({ '_id': { $in: eventsId}});
        } else {
            return [];
        }
    }
    return Events.find({$and: eventsOptions}, options.sortLimitOptions);
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
    event_create: function(e, categoryCode){
        var event  = {owner:{id:this.userId}, createdAt: Date.now(), removed:false};
        event.department = Departments.findOne({code: e.department.code});
        event.location = {longitude:setFloatValue(e.location.longitude), latitude:setFloatValue(e.location.latitude)};
        event.name = setStringValue(e.name, 100);
        event.description = setStringValue(e.description, 5000);
        var category = Categories.findOne({code: categoryCode});
        event.icon = category ? 'category/'+category.code+'-marker.png' : 'category/e-marker-pastel-blue.png';
        event.startDate = setDateValue(e.startDate);
        event.endDate = setDateValue(e.endDate);
        return Events.insert(event);
    },
    event_update: function(e){
        console.log('event_update called');
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
		        EventSkills.update({'eventId': eventId}, {$set: {removed:true, removedAt: Date.now()}});
                return Events.update({_id: eventId}, {$set: {removed:true, removedAt: Date.now()}});}
        }
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not remove this event');
    }
});





Meteor.publish("event-skills", function(options){
    if(options && options.collectionOptions && options.collectionOptions.event && options.collectionOptions.event.id){
        options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:1};
        var arrOptions = [];
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
    event_skill_create: function(eventId, skills){
    	var ids = [];
    	var userId = this.userId;
        console.log(eventId);
        console.log(skills);
        var event = Events.findOne({_id:eventId, 'owner.id':userId});
        if(event){
            for(var i=0; i < skills.length ; i++){
                var skill = skills[i];
                var eventSkill = {};
                eventSkill.eventId = event._id;
                eventSkill.categoryCode = Categories.findOne({code: skill.categoryCode}).code;
                eventSkill.level = checkRange(0,5,skill.level);
                eventSkill.owner = {id:userId};
                ids.push(EventSkills.insert(eventSkill));
            }
            return ids;
        } else {
            throw new Meteor.Error(401, 'Error 401: Not allowed - You can not create event skills on event you dont own');
        }
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
