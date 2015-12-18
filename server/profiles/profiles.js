Profiles = new Mongo.Collection("profiles");

Meteor.methods({
    save_profile: function(p){
        var profile = Profiles.findOne({'owner.id': this.userId});
        if(profile){
            fillInfo();
            Profiles.update({_id: profile._id}, {$set: {
                userName: profile.userName,
                firstName: profile.firstName,
                lastName: profile.lastName,
                active: profile.active,
                updatedAt: Date.now()
            }});
        } else {
            profile = {owner:{id:this.userId}, createdAt: Date.now()};
            fillInfo();
            Profiles.insert(profile);
        }
        function fillInfo(){
            profile.userName = setStringValue(p.userName, 100);
            profile.firstName = setStringValue(p.firstName, 100);
            profile.lastName = setStringValue(p.lastName, 100);
            profile.active = p.active ? true : false;            
        }
    }
});



Meteor.publish("all-profiles", function(){
    if(isAdmin(this.userId)){
        return Profiles.find({});
    } else {
        this.stop();
        return;
    }
});

Meteor.publish("my-profile", function(){
    return Profiles.find({'owner.id' :  this.userId});
});



ProfileImages = new FS.Collection("profile_images", {
  stores: [
    new FS.Store.GridFS("original")
    /*  ,
    new FS.Store.GridFS("thumbnail", {
          transformWrite: function(fileObj, readStream, writeStream) {
            gm(readStream, fileObj.name()).resize('60', '60', '!').stream().pipe(writeStream);
          }
        })*/
  ],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

ProfileImages.allow({
    insert: function (userId, img) {
        return isAdmin(userId) || userId && img.owner.id === userId;
    },
    update: function (userId, img, fields, modifier) {
        return isAdmin(userId) || userId && img.owner.id === userId;
    },
    remove: function (userId, img) {
        return isAdmin(userId) || userId && img.owner.id === userId;
    },
    download: function (userId) {
        return true;
    }
});

Meteor.publish('my-profile-images', function() {
    return ProfileImages.find({'owner.id' :  this.userId}, {sort: {order:1}});
});








ProfileSkills = new Mongo.Collection("profile_skills");

Meteor.publish("profile-skills", function(options){
    if(options && options.collectionOptions && options.collectionOptions.profile && options.collectionOptions.profile.id){
        options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:1};
        var arrOptions = [{'owner.id': this.userId}];
        arrOptions.push(options.collectionOptions);
        return ProfileSkills.find({$and: arrOptions}, options.sortLimitOptions);
    } else {
        this.stop();
        return;
    }
});

ProfileSkills.deny({
    insert: function (userId, profileSkill) {
       return !isAdmin(userId);
    },
    update: function (userId, profileSkill, fields, modifier) {
        return !isAdmin(userId);
    },
    remove: function (userId, profileSkill) {
        return !isAdmin(userId);
    }
});


Meteor.methods({
    profile_skill_create: function(skill){
        var profileSkill  = {owner:{id:this.userId}, createdAt: Date.now(), removed:false};
        profileSkill.profile = {id:Profiles.findOne({'owner.id':this.userId})._id};
        profileSkill.category = {code:Categories.findOne({code: skill.category.code}).code};
        profileSkill.level = checkRange(0,5,skill.level);
        return ProfileSkills.insert(profileSkill);
    },
    profile_skill_update: function(skill){
        var profileSkill = ProfileSkills.findOne({_id:skill._id, 'owner.id':this.userId});
        if(profileSkill){
            return ProfileSkills.update({_id: skill._id}, {$set: {level:checkRange(0,5,skill.level), updatedAt: Date.now()}});
        }    
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not update this profile skill');
    },
    profile_skill_remove: function (skillId) {
        var profileSkill = ProfileSkills.findOne({_id:skillId, 'owner.id':this.userId});
        if(profileSkill){
            return ProfileSkills.remove(skillId);
        }
        throw new Meteor.Error(401, 'Error 401: Not allowed - You can not remove this profile skill');
    }
});

