angular.module("entraide").factory("SessionService", function($rootScope, CollectionService, SecurityService, $q){

    var defaultDepartment = {"code":"74","name":"Haute Savoie", location:{ "latitude":46.08,"longitude":6.39}};

    var sessionService = {

        userProfile : {
            user: null,
            department: defaultDepartment,
            image: null
        },

        getUserProfile : function() {
            this.userProfile.department = this.userProfile.department ? this.userProfile.department : defaultDepartment;
            this.userProfile.user = this.userProfile.user ? this.userProfile.user : $rootScope.currentUser;
            this.userProfile.image = this.userProfile.image ? this.userProfile.image : null;
            return this.userProfile;
        },

        setUserProfile : function(user, department, image){
            this.userProfile.user = user ? user : this.userProfile.user;
            this.userProfile.department = department ? department : defaultDepartment;
            this.userProfile.image = image ? image : null;
        },

        setDepartmentByCode : function(code) {
            var deferred = $q.defer();
            if(!SecurityService.isConnected()){
                var options = {collectionOptions:{'code': code}, backend:true};
                CollectionService.subscribe('department-by-code', options).then(function(departments) {
                    sessionService.getUserProfile().department = departments[0];
                    deferred.resolve(null, departments[0]);
                });
            } else {
                deferred.resolve(null, defaultDepartment);
            }
            return deferred.promise;
        },

        setUserProfileImage : function(image){
            this.userProfile.image = image;
        },

        resetUser: function(){
            this.userProfile.user = null;
        },

        resetDepartment: function(){
            this.userProfile.department = null;
        },

        resetImage: function(){
            this.userProfile.image = null;
        },

        resetUserProfile: function(){
            this.resetUser();
            this.resetDepartment();
            this.resetImage();
        },

        getOwner: function(){
            return {id: this.getUserProfile().user._id};
        },

        getUserEmail: function(){
            return this.getUserProfile().user ? this.getUserProfile().user.emails[0].address : '';
        },
        
        getDefaultUserName: function(){
            return this.getUserEmail().split('@')[0];
        }
    };

    return sessionService;
});
