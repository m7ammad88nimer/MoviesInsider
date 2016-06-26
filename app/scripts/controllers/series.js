'use strict';

/**
 * @ngdoc function
 * @name moviesInsiderApp.controller:showsCtrl
 * @description
 * # showsCtrl
 * Controller of the moviesInsiderApp
 */
angular.module('moviesInsiderApp')
  .controller('SeriesCtrl', function ($scope, $rootScope, $http, fetchingService, localStorageService) {
    $rootScope.currentType = 'shows';
    $scope.series = [];
    $scope.lsKeys = localStorageService.keys();

    fetchingService.getSeries().then(function(data){
        $scope.series = data;
    });

    $scope.getRating = function(ratingNumber){
        return Math.round(parseFloat(ratingNumber) * 100) / 100;
    };
    $scope.toggleWatchedMovie = function(movieID){
        localStorageService.set('whatched_movie_id'+movieID, movieID);
        $scope.lsKeys.push('whatched_movie_id'+movieID);
    };

    $scope.isWhatchedMovie = function(movieID){
        return ($scope.lsKeys.indexOf('whatched_movie_id'+movieID)>-1)?true: false;
    };
  });
