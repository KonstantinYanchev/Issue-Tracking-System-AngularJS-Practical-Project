"use strict";

angular.module('IssueTrackingSystem.Home', [
    'IssueTrackingSystem.Users.Authentication'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            })
        }
    ]).controller('HomeController', [
    '$scope',
    '$location',
    'authentication',
    function ($scope, $location, authentication) {
        $scope.loginUser = function (user) {
            //grant_type=password&username=Alice&password=password123
            var userAsString = 'username=' + user.email + '&password=' + user.password + '&grant_type=password';
            authentication.loginUser(userAsString)
                .then(function (loggedUser) {
                    console.log(loggedUser);
                    $location.path('/dashboard'); //TODO:: Enter a path where user should be redirected after he has logged;
                });
        };

        $scope.registerUser = function (user) {
            authentication.registerUser(user)
                .then(function (registeredUser) {
                    console.log(registeredUser);
                });
        };
    }
]);
