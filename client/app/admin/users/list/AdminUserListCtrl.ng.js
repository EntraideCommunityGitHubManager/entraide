angular.module('entraide').controller('AdminUserListCtrl', function ($scope, $meteor, CollectionService, AnimToasterNotificationService) {

    $scope.loading = true;
    var options = {'_id': { $ne: this.userId }};
    CollectionService.subscribe('all-users', options).then(function(users) {
        $scope.users = users;
        $scope.loading = false;
    });

    $scope.remove = function(user){
        $meteor.call('delete_user', user._id).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The user has been successfully deleted.");
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.getProfile = function(user){
        if(user && user.profile && user.profile.roles && user.profile.roles.length>0){
            return user.profile.roles[0];
        }
    };

});

