"use strict";

angular.module('IssueTrackingSystem', [
        'ngRoute',
        'ngSanitize',
        'ngNotify',
        'IssueTrackingSystem.Common',
        'IssueTrackingSystem.Extensions.Notifier',
        'IssueTrackingSystem.Users.Identity',
        'IssueTrackingSystem.Users.Profile',
        'IssueTrackingSystem.Home',
        'IssueTrackingSystem.Dashboard'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }
    ]).constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');