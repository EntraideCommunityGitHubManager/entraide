angular.module('entraide').directive('categoryFilter', function() {
    return {
        restrict: 'EAC',
        templateUrl: 'client/app/common/directives/category-filter/category-filter.ng.html',
        scope: {
            model: '='
        },
        controller: function($scope){
            $scope.model = $scope.model ? $scope.model : {};
            $scope.model.categoriesDisplayed = $scope.model.categoriesDisplayed ? $scope.model.categoriesDisplayed : [];
            $scope.model.categoriesSelected = $scope.model.categoriesSelected ? $scope.model.categoriesSelected : [];
            $scope.model.categoriesSelectedRating = $scope.model.categoriesSelectedRating ? $scope.model.categoriesSelectedRating : {};
            $scope.model.searchTerm = $scope.model.searchTerm ? $scope.model.searchTerm : "";
            $scope.model.filterTerm = $scope.model.filterTerm ? $scope.model.filterTerm : "";

            $scope.$watchCollection('model.categories', function(){
                console.log('binding categories collection');
                $scope.filterCategories($scope.model.filterTerm);
            });

            $scope.search = function(searchTerm){
                alert('Not yet implemented');
            };

            $scope.filterCategories = function(filterTerm){
                if(filterTerm){
                    var result = [];
                    var ancestors = [];
                    var termFound = false;
                    angular.forEach($scope.model.categories, function(cat){
                        termFound = cat.name.toLowerCase().indexOf(filterTerm.toLowerCase())> -1;
                        if(termFound){
                            if(cat.root){
                                pushDistinct(ancestors, {code: cat.code, termRootFound: true});
                                if(cat.level>0){
                                    if(cat.ancestors.length>1){
                                        angular.forEach(cat.ancestors.slice(1), function(c){
                                            pushDistinct(ancestors, {code: c, termRootFound: true});
                                        });
                                        pushDistinct(result, _.findWhere($scope.model.categories, {code: cat.ancestors[0]}))
                                    } else {
                                        pushDistinct(result, _.findWhere($scope.model.categories, {code: cat.ancestors[0]}));
                                    }
                                }
                            } else {
                                angular.forEach(cat.ancestors, function(c){
                                    pushDistinct(ancestors, {code: c, termRootFound: false});
                                });
                                result.push(cat);
                            }
                        } else if(!cat.root){
                            var ancestorFound = hasAncestor(cat, ancestors);
                            if(ancestorFound && ancestorFound.termRootFound){
                                result.push(cat);
                            }
                        } else if(cat.root && cat.level>0){
                            var ancestorFound = hasAncestor(cat, ancestors);
                            if(ancestorFound && ancestorFound.termRootFound){
                                pushDistinct(ancestors, {code: cat.code, termRootFound: true});
                                result.push(cat);
                            }
                        }
                        angular.forEach(ancestors, function(a){
                            pushDistinct(result, _.findWhere($scope.model.categories, {code: a.code}));
                        });
                    });
                    $scope.model.categoriesDisplayed = difference(result, $scope.model.categoriesSelected);
                } else {
                    $scope.model.categoriesDisplayed = difference($scope.model.categories, $scope.model.categoriesSelected);

                }
            };

            function difference(arr1, arr2){
                return _.filter(arr1, function(cat){ return !_.findWhere(arr2, {'code':cat.code}); });
            }

            function hasAncestor(cat, ancestors){
                return _.findWhere(ancestors, {code: cat.ancestors[cat.ancestors.length-1]});
            }

            function pushDistinct(arr, param){
                if(angular.isArray(param)){
                    angular.forEach(param, function(obj){
                        pushDistinctObj(arr, obj);
                    });
                } else {
                    pushDistinctObj(arr, param);
                }
            }

            function pushDistinctObj(arr, c){
                var found = _.findWhere(arr, {code:c.code}) != undefined;
                if(!found){
                    arr.push(c);
                }
            }

            $scope.getCategoryIconStyle = function(cat){
                return {
                    'background-image': "url('category/" + cat.code + "/" + cat.code + ".png')"
                };
            };

            $scope.getStyle = function(cat){
                if(cat.root){
                    return {
                        'background-image': "url('category/" + cat.code + "/" + cat.code + ".png')",
                        'flex-basis': '375px'
                    };
                } else {
                    return $scope.getCategoryIconStyle(cat);
                }
            };

            $scope.setRating = function(rating, cat){
                $scope.model.categoriesSelectedRating[cat.code] = rating;
            };

            $scope.getRating = function(cat){
                var val = $scope.model.categoriesSelectedRating[cat.code];
                return val && val > 0 ? val : 0;
            };

            $scope.addCategory = function(cat){
                if(!cat.root){
                    var index = indexOf($scope.model.categoriesDisplayed, cat, 'code');
                    $scope.model.categoriesSelected.push($scope.model.categoriesDisplayed.splice(index,1)[0]);
                }
            };

            $scope.removeCategory = function(cat){
                var index = indexOf($scope.model.categoriesSelected, cat, 'code');
                $scope.model.categoriesDisplayed.push($scope.model.categoriesSelected.splice(index,1)[0]);
                $scope.filterCategories($scope.model.filterTerm);
            };

            function indexOf(arr, obj, prop){
                for(var i=0; i< arr.length; i++){
                    if(obj[prop]===arr[i][prop]){
                        return i;
                    }
                }
                return -1;
            }

        },
        link: function(scope, elt, attrs, controller) {

        }
    };
});