angular.module("entraide").factory("NotificationService", function(){

    var notificationService = {
        infoQueue: [],
        successQueue: [],
        warningQueue: [],
        errorQueue: [],
        infoMessage: null,
        successMessage: null,
        warningMessage: null,
        errorMessage: null
    };
    
    return notificationService;
});
