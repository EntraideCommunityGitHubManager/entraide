angular.module('entraide').controller('AdminCategoryEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.categories=categories;
        $scope.category = $meteor.object(Categories, $stateParams.categoryId, false);
    });

    $scope.update = function(category){
        category.save().then(function(){$scope.back();}, function(error){alert(error);});
    };

    $scope.remove = function(category){
        $scope.categories.remove(category).then(function(){$scope.back();},function(err){alert(err);});
    };

    $scope.back = function(){
        $state.go('app.main.admin.lookups.all');
    };

    $scope.hasChanged = function(){
        return true;
    };

});

