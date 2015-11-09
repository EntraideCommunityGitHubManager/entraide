angular.module('entraide').directive('animBackground', function(){

    return {
        restrict: 'AEC',
        scope: {
            startEvent: '@',
            stopEvent : '@'
        },
        templateUrl: 'client/app/directives/anim-background/anim-background.ng.html',
        controller: function($scope){
            $scope.BV = null;
            $scope.isTouch = Modernizr.touch;
            if (!$scope.isTouch) {
                $scope.BV = new $.BigVideo({forceAutoplay:$scope.isTouch});
                $scope.BV.init();
                $scope.BV.show('video/beach.mp4',{ambient:true});
            }

            $scope.$on($scope.startEvent, function(){
                $scope.BV ? $scope.BV.show('video/beach.mp4',{ambient:true}) : null;
            });

            $scope.$on($scope.stopEvent, function(){
                $scope.BV ? $scope.BV.show('img/beach.jpg',{ambient:true}) : null;
            });
        },
        link: function (scope, element) {

            scope.$on("$destroy", function () {

            });
        }
    };

});