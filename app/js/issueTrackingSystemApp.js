"use strict";

angular.module('IssueTrackingSystem', [
        'ngRoute',
        'IssueTrackingSystem.Home'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]);