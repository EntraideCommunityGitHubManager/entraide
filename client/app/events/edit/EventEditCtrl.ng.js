angular.module('entraide').controller('EventEditCtrl', function ($rootScope, $scope, $meteor, $stateParams, $state, CollectionService, AnimService, AnimToasterNotificationService) {

    console.log('EventEditCtrl');

    if($stateParams.event && $stateParams.event._id) {
        $scope.event = $meteor.object(Events, $stateParams.event._id, false);
        CollectionService.subscribe('event_skills', {'event.id':$stateParams.event._id}).then(function(eventSkills){
            $scope.eventSkills = eventSkills;
        });
        AnimService.stopTransition();
    }

    $scope.update = function(event) {
        $scope.error=null;
        $meteor.call('event_update', event.getRawObject()).then(function(){
            $rootScope.$broadcast('anim-sidebar-toggle');
            AnimToasterNotificationService.addSuccessMessage("L'évenement a été enregistré avec succès !");
        },function(err){$scope.error=err;});
    };

    $scope.remove = function(event) {
        $scope.error=null;
        $meteor.call('event_remove', event._id).then(function(){
            $rootScope.$broadcast('anim-sidebar-toggle');
            AnimToasterNotificationService.addSuccessMessage("L'évenement a été supprimé avec succès !");
        },function(err){$scope.error=err;});
    };
    
    $scope.addSkill = function(skill) {
        $scope.error=null;
        $meteor.call('event_skill_create', skill).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Skill ajouté avec succès !");
        },function(err){$scope.error=err;});
    };
    
    $scope.updateSkill = function(skill) {
        $scope.error=null;
        $meteor.call('event_skill_update', skill.getRawObject()).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Skill enregistré avec succès !");
        },function(err){$scope.error=err;});
    };
    
    $scope.removeSkill = function(skill) {
        $scope.error=null;
        $meteor.call('event_skill_remove', skill._id).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Skill supprimé avec succès !");
        },function(err){$scope.error=err;});
    };

    $scope.close=function(){
        $rootScope.$broadcast('anim-sidebar-toggle');
    };

    $scope.hasChanged = function(){
        return true;
    };

});
