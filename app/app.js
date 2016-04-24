'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.router',
    'ui.materialize',
    'myApp.home',
    'myApp.roomba',
    'grid_directive',
    'myApp.version'
]).
config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: "",
                templateUrl: "navigation/navigation.html",
                authenticate: true
            })
            .state('app.home', {
                url: "/home",
                templateUrl: "home/home.html"
            })
            .state('app.roomba', {
                url: "/roomba",
                templateUrl: "roomba/roomba.html",
                params: {
                    dataObj: null
                }
            });

        $urlRouterProvider.otherwise('/home');
}]);
