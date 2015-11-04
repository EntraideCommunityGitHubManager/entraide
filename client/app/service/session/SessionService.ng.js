angular.module("entraide").factory("SessionService", function($rootScope, CollectionService, SecurityService, $q){

    var defaultDepartment = {"code":"74","name":"Haute Savoie", location:{ "latitude":46.08,"longitude":6.39}};

    var sessionService = {

        userProfile : {
            user: null,
            department: defaultDepartment
        },

        getUserProfile : function(){
            return this.userProfile;
        },

        setUserProfile : function(user, department){
            this.userProfile.user = user ? user : this.userProfile.user;
            this.userProfile.department = department ? department : defaultDepartment;
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
            return deferred.promise;;
        },

        resetUser: function(){
            this.userProfile.user = null;
        },

        resetDepartment: function(){
            this.userProfile.department = null;
        },

        resetUserProfile: function(){
            this.resetUser();
            this.resetDepartment();
        }
    };

    return sessionService;
});
