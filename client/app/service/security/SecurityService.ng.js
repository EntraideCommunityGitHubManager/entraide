angular.module("entraide").factory("SecurityService", function($meteor){

    var securityService = {

        login: function(login, password){

        },
        logout: function(){
            $meteor.logout();
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
