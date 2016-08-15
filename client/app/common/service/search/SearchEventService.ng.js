angular.module("entraide").factory("SearchEventService", function($rootScope, CollectionService, $q){

    var searchEventService = {
        searchEventFilter: { searchTerm: "", filterTerm: "", categories: []}
    };

    return searchEventService;
});
