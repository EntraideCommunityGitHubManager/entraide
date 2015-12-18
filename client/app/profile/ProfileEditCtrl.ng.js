angular.module('entraide').controller('ProfileEditCtrl', function ($rootScope, $scope, $meteor, CollectionService, SecurityService, SessionService, MapService, AnimToasterNotificationService) {

    console.log('ProfileEditCtrl');

    $scope.profileState = 'info';
    $scope.setProfileState = function(profileState){
        $scope.profileState = profileState;
    };

    CollectionService.subscribe('my-profile').then(function(profiles){
        $scope.profile = $meteor.object(Profiles, profiles[0] ? profiles[0]._id : null, false) ;
        CollectionService.subscribe('my-profile-images').then(function(images){
            $scope.images = images;
        });
    });

    /*********************/
    /*      Info         */
    /*********************/
    $scope.saveProfile = function(){
        $scope.error = null;
        $meteor.call('save_profile', $scope.profile.getRawObject()).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Profile enregistré avec succès !");
        },function(err){ $scope.error=err;});
    };



    /*********************/
    /*      Camera       */
    /*********************/
    var MAX_IMAGES = 3;
    $scope.images = [];

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
            fsFile.favorite = $scope.images.length==0 ? true : false;
            if($scope.images.length==0){
                SessionService.setUserProfileImage(fsFile);
            }
            $scope.images.save(fsFile).then(function (image) {
                setPicture(undefined);
            }, function(error){console.log(error);});
        }
    };

    $scope.remove = function(img){
        var favorite = img.favorite;
        setTimeout(function(){
            $scope.images.remove(img).then(function(){
                if(favorite && $scope.images.length>0){
                    $scope.images[0].update({$set: {'favorite': true}});
                    SessionService.setUserProfileImage($scope.images[0]);
                } else {
                    SessionService.resetImage();
                }
            });
        },100);
    };

    $scope.camera = function(){
        $meteor.getPicture().then(function(data){setPicture(data);});
    };

    $scope.setFavorite = function(img){
        angular.forEach($scope.images, function(image){
            if(image._id == img._id){
                image.update({$set: {'favorite': true}});
                SessionService.setUserProfileImage(image);
            } else {
                image.update({$set: {'favorite': false}});
            }
        });
    };

    var setPicture = function(img){
        $scope.imgSrc = img;
        $scope.myCroppedImage = '';
    };

    $scope.addable = function(){
        return $scope.images.length < MAX_IMAGES;
    };

    /*********************/
    /*      Skills       */
    /*********************/
    $scope.addSkill = function(skill) {
        $scope.error=null;
        $meteor.call('profile_skill_create', skill).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Skill ajouté avec succès !");
        },function(err){$scope.error=err;});
    };
    
    $scope.updateSkill = function(skill) {
        $scope.error=null;
        $meteor.call('profile_skill_update', skill.getRawObject()).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Skill enregistré avec succès !");
        },function(err){$scope.error=err;});
    };
    
    $scope.removeSkill = function(skill) {
        $scope.error=null;
        $meteor.call('profile_skill_remove', skill._id).then(function(){
            AnimToasterNotificationService.addSuccessMessage("Skill supprimé avec succès !");
        },function(err){$scope.error=err;});
    };

    /*********************/
    /*      Config       */
    /*********************/
    $scope.isSelected = function(mapStyle){
        return mapStyle == MapService.getCurrentMapStyle() ? '-selected' : '';
    };

    $scope.getAnimClickIcon = function(mapStyle){
        return mapStyle == MapService.getCurrentMapStyle() ? 'fa-dot-circle-o' : 'fa-circle-o';
    };

    $scope.mapStyles = MapService.getMapStyles().mapStyles;
    $scope.setMapStyle = function(mapStyle){
        MapService.setCurrentMapStyle(mapStyle);
    };

    /*********************/
    /*    Security       */
    /*********************/
    $scope.security = {};
    $scope.changePassword = function(){
        if($scope.security.newPassword== $scope.security.newPasswordDiff){
            SecurityService.changePassword($scope.security.oldPassword, $scope.security.newPassword).then(function () {
                $scope.error =null;
                AnimToasterNotificationService.addSuccessMessage("Mot de passe modifié avec succès !");
            }, function(err){$scope.error=err;});
        } else {
            $scope.error={reason:'Les 2 nouveaux mots de passe ne correspondent pas.'};
        }

   };

});



