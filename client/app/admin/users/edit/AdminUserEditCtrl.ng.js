
angular.module('entraide').controller('AdminUserEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-users').then(function(){
        $scope.user = $meteor.object(Meteor.users, $stateParams.userId, false);
    });

    $scope.update = function(user){
        user.save().then(function(){$scope.back();},function(error){alert(error);});
    };

    $scope.remove = function(event){
        $scope.events.remove(event).then(function(){$scope.back();},function(err){alert(err);});
    };

    $scope.back = function(){
        $state.go('app.main.admin.users.all');
    };

    $scope.hasChanged = function(){
        return true;
    };

});

