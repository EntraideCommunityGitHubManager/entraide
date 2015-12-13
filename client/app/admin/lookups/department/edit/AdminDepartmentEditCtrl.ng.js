angular.module('entraide').controller('AdminDepartmentEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-departments').then(function(departments){
        $scope.departments = departments;
        $scope.department = $meteor.object(Departments, $stateParams.departmentId, false);
    });

    $scope.update = function(department){
        department.save().then(function(){$scope.back();}, function(error){alert(error);});
    };

    $scope.remove = function(department){
        $scope.departments.remove(department).then(function(){$scope.back();},function(err){alert(err);});
    };

    $scope.back = function(){
        $state.go('app.main.admin.lookups.all');
    };
   
    $scope.hasChanged = function(){
        return true;
    };

});

