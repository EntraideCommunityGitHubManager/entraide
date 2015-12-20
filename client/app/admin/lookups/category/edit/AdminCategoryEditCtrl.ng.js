angular.module('entraide').controller('AdminCategoryEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService, AnimToasterNotificationService) {

    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.categories=categories;
        $scope.category = $meteor.object(Categories, $stateParams.categoryId, false);
    });

    $scope.update = function(category){
        category.save().then(function(){
            AnimToasterNotificationService.addSuccessMessage("The category has been successfully updated.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.remove = function(category){
        $scope.categories.remove(category).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The category has been successfully changed.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.back = function(){
        $state.go('app.main.admin.lookups.all');
    };

    $scope.hasChanged = function(){
        return true;
    };

});

