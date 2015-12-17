angular.module("entraide").factory("NotificationService", function($rootScope, CollectionService, SecurityService, $q){

    var notificationService = {
        infoMessage: [],
        successMessage: [],
        errorMessage: []
    };
    
    return notificationService;
});
