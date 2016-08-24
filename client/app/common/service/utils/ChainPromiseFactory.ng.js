angular.module('entraide').factory('ChainPromiseFactory', [function () {
    return {
        chain: function(method, params, callbackSuccess, callbackError) {
            return function() {
                return method.apply(this, params).then(function(){
                    callbackSuccess();
                }, function(err){
                    callbackError(err);
                });
            };
        }
    };
}]);

