angular.module('entraide').directive('categoryFilter', function(UtilsService) {
    return {
        restrict: 'EAC',
        templateUrl: 'client/app/common/directives/category-filter/category-filter.ng.html',
        scope: {
            model: '='
        },
        controller: function($scope){
            var strUtils = UtilsService.stringUtils;
            $scope.model = $scope.model ? $scope.model : {};
            $scope.model.categoriesDisplayed = $scope.model.categoriesDisplayed ? $scope.model.categoriesDisplayed : [];
            $scope.model.categoriesSelected = $scope.model.categoriesSelected ? $scope.model.categoriesSelected : [];
            $scope.model.categoriesSelectedRating = $scope.model.categoriesSelectedRating ? $scope.model.categoriesSelectedRating : {};
            $scope.model.searchTerm = $scope.model.searchTerm ? $scope.model.searchTerm : "";
            $scope.model.filterTerm = $scope.model.filterTerm ? $scope.model.filterTerm : "";

            $scope.structCats = [];

            $scope.$watchCollection('model.categories', function(){
                console.log('binding categories collection');
                var currentCat = {cat: null, termsRootFound:[], subs:[]};
                angular.forEach($scope.model.categories, function(cat, i){
                    if(cat.root){
                        currentCat = {cat: cat, termsRootFound:[], subs:[]}
                        $scope.structCats.push(currentCat);
                    } else {
                        currentCat.subs.push(cat);
                    }
                });
                $scope.filterCategories($scope.model.filterTerm);
            });

            $scope.search = function(searchTerm){
                alert('Not yet implemented');
            };

            $scope.filterCategories = function(filterTerm){
                if(filterTerm){
                    var result = [];
                    angular.forEach($scope.structCats, function(cs){
                        cs.termsRootFound = strUtils.matchTerms(filterTerm.toLowerCase(), cs.cat.terms ? cs.cat.terms : strUtils.handleAccent(cs.cat.name));
                        var subcats = [];
                        angular.forEach(cs.subs, function(subcat){
                            if(strUtils.matchTerms(filterTerm.toLowerCase(), subcat.terms ? subcat.terms : strUtils.handleAccent(subcat.name)).length>0){
                                subcats.push(subcat);
                            }
                        });
                        var words = strUtils.wordsArray(filterTerm.toLowerCase());
                        if(words.length>1){
                            if(subcats.length>0){
                                if(cs.termsRootFound.length>1){
                                    result.push(cs.cat);
                                    result = result.concat(cs.subs);
                                } else {
                                    result.push(cs.cat);
                                    result = result.concat(subcats);
                                }
                            } else if(cs.termsRootFound.length>1){
                                result.push(cs.cat);
                                result = result.concat(cs.subs);
                            }
                        } else if(words.length===1){
                            if(subcats.length>0){
                                result.push(cs.cat);
                                result = result.concat(subcats);
                            } else if(cs.termsRootFound.length>0){
                                result.push(cs.cat);
                                result = result.concat(cs.subs);
                            }
                        }
                    });
                    $scope.model.categoriesDisplayed = difference(result, $scope.model.categoriesSelected);
                } else {
                    $scope.model.categoriesDisplayed = difference($scope.model.categories, $scope.model.categoriesSelected);

                }
            };

            function difference(arr1, arr2){
                return _.filter(arr1, function(cat){ return !_.findWhere(arr2, {'code':cat.code}); });
            }

            $scope.getStyle = function(cat){
                return {
                    'background-image': "url('category/" + cat.code + ".png')"
                };
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
                delete $scope.model.categoriesSelectedRating[cat.code];
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
