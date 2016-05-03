"use strict";

angular.module('IssueTrackingSystem.Dashboard', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/dashboard', {
                templateUrl: 'js/dashboard/dashboard.html',
                controller: 'DashboardController'
            });
        }
    ]).controller('DashboardController', [
        '$scope',
        function ($scope) {

        }
    ]);