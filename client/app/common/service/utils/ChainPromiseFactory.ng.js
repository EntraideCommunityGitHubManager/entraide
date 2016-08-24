angular.module('entraide').factory('ChainPromiseFactory', [function () {
    // Example of use :
    //var chain = $q.when();
    //angular.forEach(roles, function(role) {
    //    chain = chain.then(ChainPromiseFactory.chain(UserService.addRole, [user.id, role.id], successCallback, errorCallback));
    //});
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

