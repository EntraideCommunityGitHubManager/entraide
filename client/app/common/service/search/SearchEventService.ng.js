angular.module("entraide").factory("SearchEventService", function($rootScope, CollectionService, SessionService, $q){

    var searchEventService = {
        searchEventFilter: { 
            searchTerm: "", 
            filterTerm: "", 
            categories: [],
            categoriesDisplayed: [],
            categoriesSelected: [],
            categoriesSelectedRating: {}
        },
        searchEvents: function(){
            var service = this;
            var department = SessionService.getUserProfile().department;
            var options = {collectionOptions:{'department.code': department.code}, skillsOptions:[], backend:true};
            angular.forEach(service.searchEventFilter.categoriesSelected, function(cat){
                options.skillsOptions.push({code:cat.code, level: service.searchEventFilter.categoriesSelectedRating[cat.code]});
            });
            return CollectionService.subscribe('search-events', options);
        }
    };

    return searchEventService;
});
