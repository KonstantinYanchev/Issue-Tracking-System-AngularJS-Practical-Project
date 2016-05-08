"use strict";

angular.module('IssueTrackingSystem', [
        'ngRoute',
        'ngSanitize',
        'ngNotify',
        'simplePagination',
        'IssueTrackingSystem.Extensions.Notifier',
        'IssueTrackingSystem.Common.MainController',
        'IssueTrackingSystem.Users.UsersController',
        'IssueTrackingSystem.Projects.ProjectController',
        'IssueTrackingSystem.Users.ProfileController',
        'IssueTrackingSystem.HomeController',
        'IssueTrackingSystem.DashboardController',
        'IssueTrackingSystem.Users.Identity'
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