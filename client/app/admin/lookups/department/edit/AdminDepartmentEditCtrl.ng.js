angular.module('entraide').controller('AdminDepartmentEditCtrl', function ($scope, $meteor, $stateParams, $state, CollectionService) {

    CollectionService.subscribe('all-departments').then(function(){
        $scope.department = $meteor.object(Departments, $stateParams.departmentId, false);
    });

    $scope.update = function(department){
        department.save().then(function(){
            $state.go("app.main.admin.lookups.all");
        }, function(error){alert(error);});
    };
   
    $scope.hasChanged = function(){
        return true;
    };

});

