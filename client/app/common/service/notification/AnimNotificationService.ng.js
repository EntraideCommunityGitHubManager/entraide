angular.module("entraide").factory("AnimToasterNotificationService", function(){

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
            handleChange('info', msg);
        },
        addSuccessMessage: function(msg){
            handleChange('success', msg);
        },
        addWarningMessage: function(msg){
            handleChange('warning', msg);
        },
        addErrorMessage: function(msg){
            handleChange('error', msg);
        }
    };
	
    function handleChange(type, message){
        var queue = notificationService[type+'Queue'];
        if(queue.length==0){
            console.log('init message ' + type + ' : ' + message);
            notificationService[type+'Message'] = message;
        }
        queue.push(message);

        setTimeout(function(){
            console.log('shift queue ' + type + ' : ' + message);
            queue.shift();
            var msg = queue[0];
            console.log('set in memory msg : ' + msg);
            notificationService[type+'Message'] = null;
            console.log('set notificationService.'+type + 'Message : null');
            setTimeout(function(){
                _updateMessage(type, queue, msg);
            }, notificationService.delay);
        });
    }
    
    function _updateMessage(type, queue, message){
        return (function (type, queue, message) {
            console.log('Closure(_updateMessage) ' + type);
            notificationService[type+'Message'] = message;
            console.log('set notificationService.'+type + 'Message : ' +message);
            if(message && queue.length==0){
            	console.log('notificationService.'+type + 'Queue : []');
                setTimeout(function(){
                    notificationService[type+'Message'] = null;
                    console.log('set notificationService.'+type + 'Message : null');
                }, notificationService.delayRemove);
            }
        })(type, queue, message);
    }
    
    return notificationService;
});
