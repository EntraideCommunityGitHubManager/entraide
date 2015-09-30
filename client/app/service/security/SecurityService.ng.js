angular.module("entraide").factory("SecurityService", function($meteor){

    var securityService = {

        loginWithPassword: function(email, password){
            return  $meteor.loginWithPassword(email, password);
        },
        logout: function(){
            $meteor.logout();
        },
        createUser: function(user){
            return $meteor.createUser(user);
        },
        isAdmin: function(user){
            if(user && user.profile && user.profile.roles && user.profile.roles.length>0){
                for(var i=0; i< user.profile.roles.length; i++){
                    if(user.profile.roles[i]==="admin"){
                        return true;
                    }
                }
            }
            return 'FORBIDDEN';
        },
        isConnected: function(user){
            if(user){
                return true
            }
            return false;
        }
    };

    return securityService;
});
