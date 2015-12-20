angular.module("entraide").factory("AnimToasterNotificationService", function($timeout){

    var notificationService = {
        delay: 3000,
        delayRemove: 1500,
        infoQueue: [],
        successQueue: [],
        warningQueue: [],
        errorQueue: [],
        infoMessage: null,
        successMessage: null,
        warningMessage: null,
        errorMessage: null,

        addInfoMessage: function(msg){
            addMessage('info', msg);
        },
        addSuccessMessage: function(msg){
            addMessage('success', msg);
        },
        addWarningMessage: function(msg){
            addMessage('warning', msg);
        },
        addErrorMessage: function(msg){
            addMessage('error', msg);
        }
    };

    function addMessage(type, message){
        var queue = notificationService[type+'Queue'];
        queue.push(message);
        $timeout(function(){queue.shift();},notificationService.delay);
    }

    return notificationService;
});
