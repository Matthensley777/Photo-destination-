"use strict";

app.controller("MyphotoCtrl", function($location, $rootScope, $scope, PhotoService) {

const getUserPhotos = () => {
        PhotoService.getMyPhotos($rootScope.uid).then((results) => {
            $scope.photos = results;
        }).catch((error) => {
            console.log("Error in getMyPhotos", error);
        });
    };

getUserPhotos();

$scope.deletePhoto = (Id) => {
    PhotoService.deletePhoto(Id).then((result) =>{
      getUserPhotos();
    }).catch((err) =>{
      console.log("error in deletePhoto", err);
    });
  };


});