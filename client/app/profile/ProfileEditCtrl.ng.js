angular.module('entraide').controller('ProfileEditCtrl', function ($rootScope, $scope, $meteor, CollectionService, SessionService) {

    var MAX_IMAGES = 3;
    $scope.images = [];

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
            $scope.$apply(function () {
              setPicture(e.target.result);
            });
          };
          reader.readAsDataURL(files[0]);
        } else {
            setPicture(undefined);
        }
    };
    
    $scope.saveCroppedImage = function () {
        if ($scope.myCroppedImage !== '' && $scope.addable()) {
            var fsFile = new FS.File($scope.myCroppedImage);
            fsFile.owner = SessionService.getOwner();
            fsFile.visible = $scope.images.length==0 ? true : false;
            if($scope.images.length==0){
                SessionService.setUserProfileImage(fsFile);
            }
            $scope.images.save(fsFile).then(function (image) {
              setPicture(undefined);
            }, function(error){console.log(error);});
        }
    };

    $scope.remove = function(img){
        var visible = img.visible;
        $scope.images.remove(img).then(function(){
            if(visible && $scope.images.length>0){
                $scope.images[0].update({$set: {'visible': true}});
                SessionService.setUserProfileImage($scope.images[0]);
            } else {
                SessionService.resetImage();
            }
        });
    };

    $scope.camera = function(){
        $meteor.getPicture().then(function(data){
            setPicture(data);
        });
    };
    
    $scope.setVisible = function(img){
        angular.forEach($scope.images, function(image){
            if(image._id == img._id){
                image.update({$set: {'visible': true}});
                SessionService.setUserProfileImage(image);
            } else {
                image.update({$set: {'visible': false}});
            }
        });


    };

    var setPicture = function(img){
        $scope.imgSrc = img;
        $scope.myCroppedImage = '';
    }
    
    $scope.addable = function(){
        return $scope.images.length < MAX_IMAGES;  
    };

    
});



