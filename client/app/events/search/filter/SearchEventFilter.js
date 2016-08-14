angular.module('entraide').controller('SearchEventFilterCtrl', function ($rootScope, $scope, $meteor, $state, SessionService, CollectionService, SecurityService) {

    console.log('SearchEventFilterCtrl');
    
    $scope.categoryFilterModel = {
        categories: []
    };
    $scope.isConnected = SecurityService.isConnected;
    
    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.categoryFilterModel.categories = categories;
    }, function(err){console.log(err);});

    $scope.search = function(){
        alert('search');
    };

    $scope.goTo = function(state){
        $state.go(state);
    };
    
    $scope.getCategoryClass=function(cat){
        var level = cat.code.split("-").length;
        return cat.code + "-" +level;
    }

});

