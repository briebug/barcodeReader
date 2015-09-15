// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var barcodeExample = angular.module('starter', ['ionic', 'ngCordova'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

barcodeExample.controller('BarcodeExampleController', function($http, $scope, $cordovaBarcodeScanner) {

  $scope.scanBarcode = function () {
    $cordovaBarcodeScanner.scan()
      .then(function(imageData) {
        var CODE = imageData.text,
          APIKEY = 'd2a3f7eb24595b136ecb5d4657bef2fe';

        $http.get('http://api.upcdatabase.org/json/' + APIKEY + '/' + CODE)
          .then(function(response) {
            $scope.product = response.data;
          }, function (error) {
            alert(error);
          });
      }, function (error) {
        alert('an error has occurred: ' + error);
      });
  };
});
