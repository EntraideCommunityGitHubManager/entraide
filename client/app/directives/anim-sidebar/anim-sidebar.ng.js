angular.module('entraide').directive('animSidebar', function(){

    return {
        restrict: 'AEC',
        controller: function($scope){
           console.log('animSideBar controller')
        },
        link: function (scope, element) {
            scope.$on("$destroy", function () {

            });
        }
    };

});