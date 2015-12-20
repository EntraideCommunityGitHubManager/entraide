angular.module('entraide').controller('AdminUserEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService, AnimToasterNotificationService) {

    CollectionService.subscribe('all-users').then(function(){
        $scope.user = $meteor.object(Meteor.users, $stateParams.userId, false);
    });

    $scope.update = function(user){
        user.save().then(function(){
            AnimToasterNotificationService.addSuccessMessage("The user has been successfully updated.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.remove = function(user){
        $meteor.call('delete_user', user._id).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The user has been successfully deleted.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.back = function(){
        $state.go('app.main.admin.users.all');
    };

    $scope.hasChanged = function(){
        return true;
    };

});

