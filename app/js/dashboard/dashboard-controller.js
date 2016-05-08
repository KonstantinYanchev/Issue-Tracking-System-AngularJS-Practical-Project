"use strict";

angular.module('IssueTrackingSystem.DashboardController', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/Dashboard', {
                templateUrl: 'js/dashboard/dashboard.html',
                controller: 'DashboardController'
            });
        }
    ]).controller('DashboardController', [
        '$scope',
        function ($scope) {

        }
    ]);