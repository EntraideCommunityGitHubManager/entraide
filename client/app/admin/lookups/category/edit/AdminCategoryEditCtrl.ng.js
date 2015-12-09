angular.module('entraide').controller('AdminCategoryEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-categories').then(function(){
        $scope.category = $meteor.object(Categories, $stateParams.categoryId, false);
    });

    $scope.update = function(category){
        category.save().then(function(){
            $state.go("app.main.admin.lookups.all");
        }, function(error){alert(error);});
    };

    $scope.hasChanged = function(){
        return true;
    };

});

