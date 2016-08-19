angular.module("entraide").factory("SearchEventService", function($rootScope, CollectionService, SessionService, $q){

    var department = SessionService.getUserProfile().department;
    var options = {collectionOptions:{'department.code': department.code}, skillsOptions:[], backend:true};

    var searchEventService = {
        searchEventFilter: { 
            searchTerm: "", 
            filterTerm: "", 
            categories: [],
            categoriesDisplayed: [],
            categoriesSelected: [],
            categoriesSelectedRating: []
        },
        searchEvents: function(){
            var service = this;
            options.skillsOptions = [];
            angular.forEach(service.categoriesSelected, function(cat, i){
                options.skillsOptions.push({code:cat.code, level: service.categoriesSelectedRating[i]});
            });
            return CollectionService.subscribe('search-events', options);
        }
    };

    return searchEventService;
});
