
Meteor.startup(function () {
    if(Meteor.users.find({'emails.address':'entraide.community.developer@gmail.com'}).count()<=0){
        Accounts.createUser({
            email: "entraide.community.developer@gmail.com",
            username: "admin",
            password: "caca",
            profile: { roles:["admin"] },
            roles: ["admin"]
        });
    }
});

// Options : trusted data (from Meteor, third libraries... ) | user : untrusted data (from front)
Accounts.onCreateUser(function(options, user) {
    if(options.email=='entraide.community.developer@gmail.com'){
        user.profile = options.profile = { roles:["admin"] };
        user.roles = options.roles = ["admin"];
    } else {
        user.profile = options.profile = { roles:["helper"] };
        user.roles = options.roles = ["helper"]
    }
    return user;
});

Meteor.publish("all-users", function(){
    if(isAdmin(this.userId)){
        return Meteor.users.find({'_id': { $ne: this.userId }});
    } else {
        this.stop();
        return;
    }
});

Meteor.methods({
    delete_user: function (userId) {
        if(isAdmin(this.userId) && userId != this.userId){
            Events.remove({'owner.id':userId});
            return Meteor.users.remove(userId);
        }
        throw new Meteor.Error(401, 'Error 401: Not allowed', 'You can not delete this user');
    }
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
