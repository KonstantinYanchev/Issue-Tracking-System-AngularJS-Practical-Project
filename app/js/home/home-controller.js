"use strict";

angular.module('IssueTrackingSystem.Home', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            })
        }
    ]).controller('HomeController', [
        '$scope',
        function ($scope) {
        }
    ]);