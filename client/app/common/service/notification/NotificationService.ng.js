angular.module("entraide").factory("NotificationService", function(){

    var notificationService = {
        infoQueue: [],
        successQueue: [],
        warningQueue: [],
        errorQueue: [],
        infoMessage: null,
        successMessage: null,
        warningMessage: null,
        errorMessage: null,
        
        addInfoMessage: function(msg){
            this.infoQueue.push(msg);
        },
        addSuccessMessage: function(msg){
            this.successQueue.push(msg);
        },
        addWarningMessage: function(msg){
            this.warningQueue.push(msg);
        },
        addErrorMessage: function(msg){
            this.errorQueue.push(msg);
        }
    };
    
    return notificationService;
});
