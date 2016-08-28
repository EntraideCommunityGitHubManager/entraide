angular.module('entraide').directive('anim-spinner', function spinnerHeaderDirective($compile) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element) {
            var spinner = angular.element('<div class="spinner"><span class="loader loader-circles"></span></div>');
            $compile(spinner)(scope);
            element.after(spinner);
            scope.$on('$destroy', function () {spinner.remove();});
        }
    };
});

