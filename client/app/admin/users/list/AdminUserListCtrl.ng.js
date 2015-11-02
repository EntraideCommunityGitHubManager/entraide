angular.module('entraide').controller('AdminUserListCtrl', function ($scope, $meteor, CollectionService) {

    $scope.loading = true;
    var options = {'_id': { $ne: this.userId }};
    CollectionService.subscribe('all-users', options).then(function(users) {
        $scope.users = users;
        $scope.loading = false;
    });

    $scope.remove = function(user){
        $meteor.call('delete_user', user._id).then(function(){},function(error){alert(error);});
    };

    $scope.getProfile = function(user){
        if(user && user.profile && user.profile.roles && user.profile.roles.length>0){
            return user.profile.roles[0];
        }
    };

});

