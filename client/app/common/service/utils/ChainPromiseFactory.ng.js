angular.module('entraide').factory('ChainPromiseFactory', [function () {
    // Example of use :
    //var chain = $q.when();
    //angular.forEach(roles, function(role, i) {
    //    var callbackSuccessCondition = i==roles.length;
    //    chain = chain.then(ChainPromiseFactory.chain(UserService.addRole, [user.id, role.id], successCallback, errorCallback, callbackSuccessCondition));
    //});
    return {
        chain: function(method, params, callbackSuccess, callbackError, csc, cec) {
            return function() {
                return method.apply(this, params).then(function(params){
                    if(!(angular.isDefined(csc) && csc != null && csc == false)){
                        callbackSuccess(params);
                    }
                }, function(err){
                    if(!(angular.isDefined(csc) && cec != null && cec == false)){
                        callbackError(err);
                    }
                });
            };
        }
    };
}]);

