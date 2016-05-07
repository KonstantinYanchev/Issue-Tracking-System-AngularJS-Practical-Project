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
    ]).run([
        '$rootScope',
        '$location',
        function ($rootScope, $location) {
            //If you are not logged in you cannot access other routes besides #/;
            $rootScope.$on('$routeChangeStart', function (event, next, current) {
                if(!localStorage['userAuth']) {
                    //if we dont have a logged in user, so we need to stay at home page;
                    if(next.templateUrl == 'js/home/home.html') {

                    } else {
                        $location.path('/');
                    }
                }
            });
        }
    ]).constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');