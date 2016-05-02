"use strict";

angular.module('IssueTrackingSystem', [
        'ngRoute',
        'IssueTrackingSystem.Users.Authentication',
        'IssueTrackingSystem.Home'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]).constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');