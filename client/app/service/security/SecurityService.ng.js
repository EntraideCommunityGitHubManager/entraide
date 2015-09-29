angular.module("entraide").factory("SecurityService", function(){

    var securityService = {
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
