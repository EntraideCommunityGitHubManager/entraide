angular.module('entraide').controller('SideLeftCtrl', function ($rootScope, $scope, SecurityService) {

    console.log("side-left-view Ctrl");

    $scope.isOpen = false;
    $scope.isConnected = SecurityService.isConnected;
    $scope.currentView = 'event';

    $scope.toggleSidebar = function(){toggle();};
    $scope.$on('event-create', function(){toggle(true, 'event');});
    $scope.$on('event-edit', function(){toggle(true, 'event')});
    $scope.$on('event-detail', function(){toggle(true, 'event')});
    $scope.$on('profile-edit', function(){toggle(true, 'profile')});

    function toggle(open, currentView){
        $scope.currentView = currentView;
        open ? $scope.isOpen = true : $scope.isOpen = !$scope.isOpen;
        $rootScope.$broadcast('anim-sidebar-toggle');
    };
    
    $scope.isView = function(view){
        return view == $scope.currentView;
    }

});

angular.module('entraide').controller('ProfileEditCtrl', function ($rootScope, $scope, CollectionService) {

    CollectionService.subsribe('my-profile').then(function(data){
        $scope.profile = data[0];
        CollectionService.subsribe('profile-images').then(function(images){
            $scope.images = images;
        });
    });
    
    $scope.addImages = function (files) {
        if (files.length > 0) {
          $scope.images.save(files[0]);
        }
    };

    
});



