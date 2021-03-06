'use strict';

/**
 * @ngdoc service
 * @name moviesInsiderApp.fetchingService
 * @description Fetching Service deals with traktTV API to provide the most watched series and movies
 * # fetchingService
 * Service in the moviesInsiderApp.
 */
angular.module('moviesInsiderApp')
  .service('fetchingService', function ($http, $httpParamSerializerJQLike, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    /**
     * FetchingService: Service core class using prototype revealing module design pattern
     * # FetchingService: Constructer function to store the API keys and configs and headers
     */
    var FetchingService = function(){
        this.apiPath = "https://api-v2launch.trakt.tv";
        this.apiToken = "055bd8c102d9f00e7b49b869a400f0ccd4f143c8383c8c59704e9673ceca8840";
        this.apiVersion = 2;
        this.headersObject = {
            "Content-Type": "application/json",
            "trakt-api-version": this.apiVersion,
            "trakt-api-key" : this.apiToken
        };
        this.apiParams = {
            page: 1,
            limit: 69
        };
        this.period = "monthly";
    };

    FetchingService.prototype = function(){

        /**
         * fetchGenres function to fetch genres list and return the response data
         * @return {promise} to make sure when the request done to resolve the data
         */
        var fetchGenres = function(){
            var deffered =  $q.defer();
            $http({
                method: 'GET',
                url: this.apiPath + '/genres/movies',
                headers: this.headersObject,
                params: this.apiParams,
                paramSerializer: '$httpParamSerializerJQLike'
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                deffered.resolve(response.data);
            }, function errorCallback(response) {
                console.log(response);
            });
            return deffered.promise;
        };

        /**
         * fetchMovies function to fetch movies list and return the response data
         * @return {promise} to make sure when the request done to resolve the data
         */
        var fetchMovies = function(){
            var deffered = $q.defer();

            Object.defineProperty(this.apiParams, 'extended', {
              enumerable: true,
              configurable: false,
              writable: true,
              value: 'full,images'
            });

            $http({
                method: 'GET',
                url: this.apiPath + '/movies/watched/' + this.period,
                headers: this.headersObject,
                params: this.apiParams,
                paramSerializer: '$httpParamSerializerJQLike'
            }).then(function successCallback(response){
                deffered.resolve(response.data);
            }, function errorCallback(response){
                console.log(response);
            });
            return deffered.promise;
        };

        /**
         * fetchSeries  function to fetch series list and return the response data
         * @return {promise} to make sure when the request done to resolve the data
         */
        var fetchSeries = function(){
            var deffered = $q.defer();

            Object.defineProperty(this.apiParams, 'extended', {
              enumerable: true,
              configurable: false,
              writable: true,
              value: 'full,images'
            });

            $http({
                method: 'GET',
                url: this.apiPath + '/shows/watched/' + this.period,
                headers: this.headersObject,
                params: this.apiParams,
                paramSerializer: '$httpParamSerializerJQLike'
            }).then(function successCallback(response){
                deffered.resolve(response.data);
            }, function errorCallback(response){
                console.log(response);
            });
            return deffered.promise;
        };

        /**
         * [fetchByGenres description]
         * @param  {string} showType  parameter to specify which the type of the show needed from the api
         * @param  {[type]} genreSlug parameter to specify which genre need to fetch from the api
         * @return {promise} to make sure when the request done to resolve the data
         */
        var fetchByGenres = function(showType, genreSlug){
            if(showType !== undefined && genreSlug !== undefined){
                var deffered = $q.defer();
                var apiParams = this.apiParams;


                Object.defineProperty(apiParams, 'limit', {
                  enumerable: true,
                  configurable: false,
                  writable: true,
                  value: 99
                });

                Object.defineProperty(apiParams, 'extended', {
                  enumerable: true,
                  configurable: false,
                  writable: true,
                  value: 'full,images'
                });

                $http({
                    method: 'GET',
                    url: this.apiPath + '/'+ showType + '/watched/' + this.period,
                    headers: this.headersObject,
                    params: apiParams,
                    paramSerializer: '$httpParamSerializerJQLike'
                }).then(function successCallback(response){
                    deffered.resolve(response.data);
                }, function errorCallback(response){
                    console.log(response);
                });
                return deffered.promise;
            }
        };


        return {
            getGenres:   fetchGenres,
            getMovies:   fetchMovies,
            getSeries:   fetchSeries,
            getByGenres: fetchByGenres
        };

    }();

    var fetchingService = new FetchingService();
    return fetchingService;

  });
