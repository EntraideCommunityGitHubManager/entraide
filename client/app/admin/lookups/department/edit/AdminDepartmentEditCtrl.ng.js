angular.module('entraide').controller('AdminDepartmentEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService, AnimToasterNotificationService) {

    CollectionService.subscribe('all-departments').then(function(departments){
        $scope.departments = departments;
        $scope.department = $meteor.object(Departments, $stateParams.departmentId, false);
    });

    $scope.update = function(department){
        department.save().then(function(){
            AnimToasterNotificationService.addSuccessMessage("The department has been successfully updated.");
            $scope.back();
        },function(error){
            AnimToasterNotificationService.addErrorMessage("Error : " + error.reason);
        });
    };

    $scope.remove = function(department){
        $scope.departments.remove(department).then(function(){
            AnimToasterNotificationService.addSuccessMessage("The department has been successfully deleted.");
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

