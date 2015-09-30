
angular.module('entraide').controller('UserEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-users').then(function(){
        $scope.user = $meteor.object(Meteor.users, $stateParams.userId, false);
    });

    $scope.update = function(user){
        user.save().then(function(){
            $state.go("app.main.admin.users.search.all");
        }, function(error){alert(error);});
    }

});

