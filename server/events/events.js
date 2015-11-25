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
    console.log("search-events");
    options.collectionOptions = options.collectionOptions ? options.collectionOptions : {'department.code' : "74"};
    options.sortLimitOptions = options.sortLimitOptions ? options.sortLimitOptions : {sort: {name:1}, limit:100};
    var arrOptions = [{'owner.id': { $ne: this.userId }}];
    arrOptions.push(options.collectionOptions);
    console.log(arrOptions);
    return Events.find({$and: arrOptions}, options.sortLimitOptions);
});







ProfileImages = new FS.Collection("profile_img", {
  stores: [
    new FS.Store.GridFS("original")
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
    }
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


