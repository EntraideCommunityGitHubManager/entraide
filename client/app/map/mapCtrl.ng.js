angular.module('entraide').controller('MapCtrl', function($rootScope, $scope, $state, SessionService, AnimService){


    console.log("map Ctrl");

    $scope.title = 'Select a department ';

    AnimService.stopTransition(1);

    $scope.goTo = function(departmentCode){
        SessionService.setDepartmentByCode(departmentCode).then(function(){
            $state.go("app.main.events.search.byProfile");
        });
    }

});