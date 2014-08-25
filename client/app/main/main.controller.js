'use strict';

angular.module('rateMyIdeAppApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $http.get('/api/ideas').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }

      $http.post('/api/ideas', { name: $scope.newThing }).then(function(){
          $http.get('/api/ideas').success(function(awesomeThings) {
              $scope.awesomeThings = awesomeThings;
          });
      });

      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/ideas/' + thing._id);
    };
  });