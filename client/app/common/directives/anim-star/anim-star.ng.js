angular.module('entraide').directive('animStar', function(){

    return {
        restrict: 'AE',
        templateUrl: 'client/app/common/directives/anim-star/anim-star.ng.html',
        scope: {
            currentRating: '=',
            maxRating : '=',
            callback: '&',
            callbackArguments: '='
        },
        compile: function(element, attrs) {
            return function link(scope, elt) {
                scope.currentRating = scope.currentRating ? scope.currentRating : 0;
                scope.maxRating = scope.maxRating ? scope.maxRating : 5;
                var callback = function(rating){
                    scope.callback()(rating, scope.callbackArguments);
                };
                rating(elt.find('#anim-star-container')[0], scope.currentRating, scope.maxRating, callback);
            };
        }
    };

});