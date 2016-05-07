"use strict";

angular.module('IssueTrackingSystem.Home', [
    'IssueTrackingSystem.Users.Authentication',
    'IssueTrackingSystem.Users.Identity'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            }).when('/Logout', {
                templateUrl: 'js/home/home.html',
                controller: 'HomeController'
            })
        }
    ]).controller('HomeController', [
    '$scope',
    '$q',
    '$location',
    'authentication',
    'identity',
    function ($scope, $q, $location, authentication, identity) {
        $scope.loginUser = function (user) {
            var userAsString = 'username=' + user.email + '&password=' + user.password + '&grant_type=password';
            authentication.loginUser(userAsString)
                .then(function (loggedUser) {
                    console.log(loggedUser);
                    $location.path('/Dashboard'); //TODO:: Enter a path where user should be redirected after he has logged;
                });
        };

        $scope.registerUser = function (user) {
            authentication.registerUser(user)
                .then(function (registeredUser) {
                    console.log(registeredUser);
                });
        };
        
        $scope.logoutUser = function () {
            //TODO: getCurrentUser and make a request through the method authentication.logout(user);
            var deferred = $q.defer();

            authentication.logoutUser()
                .then(function (response) {
                    localStorage.removeItem('userAuth');
                    sessionStorage.removeItem('isAdmin');
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error.data.error_description);
                });
        }
    }
]);
