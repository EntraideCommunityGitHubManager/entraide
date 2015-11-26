Profiles = new Mongo.Collection("profiles");

Profiles.allow({
    insert: function (userId, profile) {
        return isAdmin(userId) || userId && profile.owner.id === userId;
    },
    update: function (userId, profile, fields, modifier) {
        return isAdmin(userId) || userId && profile.owner.id === userId;
    },
    remove: function (userId, profile) {
        return isAdmin(userId) || userId && profile.owner.id === userId;
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
    new FS.Store.GridFS("original"),
    new FS.Store.GridFS("thumbnail", {
          transformWrite: function(fileObj, readStream, writeStream) {
            gm(readStream, fileObj.name()).resize('32', '32', '!').stream().pipe(writeStream);
          }
        })
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
      //return (userId ? true : false);
    }
});

Meteor.publish('profile-images', function() {
  return ProfileImages.find({'owner.id' :  this.userId}, {sort: {order:1}});
});



var isAdmin = function(userId){
    var isAdmin = false;
    var user = Meteor.users.findOne({'_id':userId});
    if(user && user.profile && user.profile.roles && user.profile.roles.length>0){
        for(var i=0; i< user.profile.roles.length; i++){
            if(user.profile.roles[i]==="admin"){
                isAdmin = true;
                break;
            }
        }
    }
    return isAdmin;
};


