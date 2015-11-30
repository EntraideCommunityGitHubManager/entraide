angular.module('entraide').controller('ProfileEditCtrl', function ($rootScope, $scope, $meteor, CollectionService, SessionService) {

    var MAX_IMAGES = 3;

    CollectionService.subscribe('my-profile').then(function(data){
        $scope.profile = data[0];
        CollectionService.subscribe('my-profile-images').then(function(images){
            $scope.images = images;
        });
    });
    
    $scope.addImages = function (files) {
        if (files.length > 0) {
          var reader = new FileReader();
          reader.onload = function (e) {
            //$scope.$apply(function () {
              setPicture(e.target.result);
            //});
          };
          reader.readAsDataURL(files[0]);
        } else {
            setPicture(undefined);
        }
    };
    
    $scope.saveCroppedImage = function () {
        if ($scope.myCroppedImage !== '') {
            var fsFile = new FS.File($scope.myCroppedImage);
            fsFile.owner = SessionService.getOwner();
            $scope.images.save(fsFile).then(function (image) {
              setPicture(undefined);
            }, function(error){console.log(error);});
        }
    };

    $scope.remove = function(img){
        $scope.images.remove(img);
    };

    $scope.camera = function(){
        $meteor.getPicture().then(function(data){
            setPicture(data);
        });
    };
    
    $scope.setVisible = function(img){
        angular.forEach($scope.images, function(image){
            if(image._id != img._id){
                image.visible = false;
            }
        });
        img.visible = true;
        $scope.images.save();
    };

    var setPicture = function(img){
        $scope.imgSrc = img;
        $scope.myCroppedImage = '';
    }
    
    $scope.addable = function(){
        return $scope.images.length < MAX_IMAGES;  
    };

    
});



