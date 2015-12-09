angular.module('entraide').controller('SearchEventFilterCtrl', function ($rootScope, $scope, $meteor, $state, SessionService, CollectionService, SearchEventService) {

    console.log('SearchEventFilterCtrl');
    
    $scope.categories = [];
    
    CollectionService.subscribe('all-categories').then(function(categories){
        $scope.categories = categories;
    }, function(err){console.log(err);});

    $scope.search = function(){
        alert('search');
    };
    
    $scope.getCategoryClass=function(cat){
        var level = cat.code.split("-").length;
        return cat.code + "-" +level;
    }

});

