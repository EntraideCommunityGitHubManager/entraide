angular.module("entraide").factory("NotificationService", function(){

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
            this.handleChange('info, msg);
        },
        addSuccessMessage: function(msg){
            this.handleChange('success', msg);
        },
        addWarningMessage: function(msg){
            this.warningQueue.push('warning', msg);
        },
        addErrorMessage: function(msg){
            this.errorQueue.push('error', msg);
        }
    };
	
	function handleChange(type, message){
		var queue = notificationService[type+'Queue'];
		
		if(queue.length==0){
			 notificationService[type+'Message'] = message;
		}
		queue.push(message);
		
		setTimeout(function(){
			queue.shift();
			var message = queue[0];
			notificationService[type+'Message'] = null;
			setTimeout(function(){
				_updateMessage(type, queue, message);
		}, notificationService.delay);
		
	}
	
	function _updateMessage(type, queue, message){
		return (function (type, queue, message) {
				notificationService[type+'Message'] = message;
				if(message && queue.length==0){
					setTimeout(function(){
						notificationService[type+'Message'] = null;
					}, notificationService.delayRemove);
				}
			
			});
		})(type, queue, message);
	}
    
    return notificationService;
});
