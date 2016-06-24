'use strict';

/**
 * @ngdoc overview
 * @name moviesInsiderApp
 * @description
 * # moviesInsiderApp
 *
 * Main module of the application.
 */
angular
  .module('moviesInsiderApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'movies'
      })
      .when('/series', {
        templateUrl: 'views/series.html',
        controller: 'SeriesCtrl',
        controllerAs: 'series'
      })
      .otherwise({
        redirectTo: '/movies'
      });
  });