angular.module("entraide").factory("SecurityService", function($rootScope, $meteor, CollectionService){

    var securityService = {

        loginWithPassword: function(email, password){
            return  $meteor.loginWithPassword(email, password);
        },
        logout: function(){
            CollectionService.stopHandlers('users');
            return $meteor.logout();
        },
        createUser: function(user){
            return $meteor.createUser(user);
        },
        changePassword: function(oldPassword, newPassword){
            return $meteor.changePassword(oldPassword, newPassword);
        },
        forgotPassword: function(options){
            return $meteor.forgotPassword(options);
        },
        resetPassword: function(token, newPassword){
            return $meteor.resetPassword(token, newPassword);
        },
        isAdmin: function(){
            var user = $rootScope.currentUser;
            if(user && user.profile && user.profile.roles && user.profile.roles.length>0){
                for(var i=0; i< user.profile.roles.length; i++){
                    if(user.profile.roles[i]==="admin"){
                        return true;
                    }
                }
            }
            return 'FORBIDDEN';
        },
        isConnected: function(){
            if($rootScope.currentUser){
                return true
            }
            return false;
        }
    };

    return securityService;
});
