angular.module('entraide').directive('categoryFilter', function() {
    return {
        restrict: 'EAC',
        templateUrl: 'client/app/common/directives/category-filter/category-filter.ng.html',
        scope: {
            model: '='
        },
        controller: function($scope){
            $scope.model.categoriesDisplayed = $scope.model.categoriesDisplayed ? $scope.model.categoriesDisplayed : [];
            $scope.model.categoriesSelected = $scope.model.categoriesSelected ? $scope.model.categoriesSelected : [];
            $scope.model.searchTerm = $scope.model.searchTerm ? $scope.model.searchTerm : "";
            $scope.model.filterTerm = $scope.model.filterTerm ? $scope.model.filterTerm : "";

            $scope.$watchCollection('model.categories', function(){
                console.log('binding categories collection');
                angular.forEach($scope.model.categories, function(cat){
                    $scope.model.categoriesDisplayed.push(cat);
                });
            });

            $scope.search = function(searchTerm){
                alert('Not yet implemented');
            };

            $scope.setRating = function(rating, cat){
                console.log(arguments);
            };

            $scope.categoryFilter = function(filterTerm){
                var result = [];
                var ancestors = [];
                var termFound = false;
                var isRoot = false;
                angular.forEach($scope.model.categories, function(cat){
                    termFound = cat.name.toLowerCase().indexOf(filterTerm)> -1;
                    isRoot = !(cat.code.indexOf('-')> -1);
                    if(termFound && isRoot){
                        ancestors.push(cat.code);
                    }
                    if(termFound || (!isRoot && _.contains(ancestors, cat.code.substring(0, cat.code.indexOf("-"))))){
                        result.push(cat);
                    }
                });

                $scope.model.categoriesDisplayed = _.difference(result, $scope.model.categoriesSelected);
            };

            $scope.getCategoryIconStyle = function(cat){
                return {'background-image': "url('category/" + cat.code + "/" + cat.code + ".png')"};
            };

            $scope.addCategory = function(cat){
                var index = indexOf($scope.model.categoriesDisplayed, cat, 'code');
                $scope.model.categoriesSelected.push($scope.model.categoriesDisplayed.splice(index,1)[0]);
            };
            $scope.removeCategory = function(cat){
                var index = indexOf($scope.model.categoriesSelected, cat, 'code');
                $scope.model.categoriesDisplayed.push($scope.model.categoriesSelected.splice(index,1)[0]);
                $scope.categoryFilter($scope.model.filterTerm);
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