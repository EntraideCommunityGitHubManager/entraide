angular.module("entraide").factory("SessionService", function(){

    var sessionService = {

        userProfile : null,

        getUserProfile : function(){
            if(!this.userProfile){
                this.initUserProfile();
            }
            return this.userProfile;
        },

        initUserProfile : function(){
            this.userProfile = {
                region: {code:'74'}
            };
        }
    };

    return sessionService;
});
