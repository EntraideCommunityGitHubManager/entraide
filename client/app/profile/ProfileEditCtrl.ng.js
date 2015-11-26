angular.module('entraide').controller('ProfileEditCtrl', function ($rootScope, $scope, $meteor, CollectionService, SessionService) {

    CollectionService.subscribe('my-profile').then(function(data){
        $scope.profile = data[0];
        CollectionService.subscribe('profile-images').then(function(images){
            $scope.images = images;
        });
    });
    
    $scope.addImages = function (files) {
        /*if (files.length > 0) {
          $scope.images.save(files[0]);
        }*/
        if (files.length > 0) {
          var reader = new FileReader();
          reader.onload = function (e) {
            $scope.$apply(function () {
              $scope.imgSrc = e.target.result;
              $scope.myCroppedImage = '';
            });
          };
          reader.readAsDataURL(files[0]);
        } else {
          $scope.imgSrc = undefined;
        }
    };
    
    $scope.saveCroppedImage = function () {
        if ($scope.myCroppedImage !== '') {
            var fsFile = new FS.File($scope.myCroppedImage);
            fsFile.owner = SessionService.getOwner();

          $scope.images.save(fsFile).then(function (image) {
            $scope.imgSrc = undefined;
            $scope.myCroppedImage = '';
          }, function(error){
              console.log(error);
          });
        }
    };

    $scope.takePicture = function(){
        $meteor.getPicture().then(function(data){
              $scope.imgSrc = data;
              $scope.myCroppedImage = '';
        });
    };

    
});



