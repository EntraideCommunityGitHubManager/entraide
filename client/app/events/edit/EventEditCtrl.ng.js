angular.module('entraide').controller('EventEditCtrl', function ($rootScope, $scope, $meteor, $stateParams, $state, CollectionService, AnimService) {

    if($stateParams.event && $stateParams.event._id) {
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
        AnimService.stopTransition();
    }

    $scope.update = function(event) {
        if(event._id) {
            event.save().then(function() {
                $rootScope.$broadcast('anim-sidebar-toggle');
            }, function(error){alert(error);});
        }
    };

    $scope.remove = function(event) {
        if(event._id) {
            CollectionService.subscribe('my-events').then(function(events) {
                events.remove(event);
                $rootScope.$broadcast('anim-sidebar-toggle');
            });
        }
    };

    $scope.hasChanged = function(){
        return true;
    };

});

angular.module('entraide').controller('ProfileEditCtrl', function ($rootScope, $scope, $meteor, $stateParams, $state, CollectionService, AnimService) {

    CollectionService.subscribe('profiles').then(function(profiles) {
        $scope.profile = $meteor.object(Profiles, profiles[0]._id, false);
        CollectionService.subscribe('profile-images').then(function(images) {
            $scope.images = images;
            AnimService.stopTransition();
        });
    });

    $scope.insertImage = function(img) {
       
    };

    $scope.removeImage = function(img) {
        
    };

    $scope.hasChanged = function(){
        return true;
    };

});



