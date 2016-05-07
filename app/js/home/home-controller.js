"use strict";

angular.module('IssueTrackingSystem.Home', [
    'IssueTrackingSystem.Users.Authentication',
    'IssueTrackingSystem.Extensions.Notifier'
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
    'notifier',
    function ($scope, $q, $location, authentication, notifier) {
        $scope.loginUser = function (user) {
            authentication.loginUser(user)
                .then(function (loggedUser) {
                    notifier.notify('You have been successfully logged in!', 'success');
                }, function (error) {
                    notifier.notify('Your e-mail or password is uncorrect. Please try again!', 'error')
                });
        };

        $scope.registerUser = function (user) {
            authentication.registerUser(user)
                .then(function (registeredUser) {
                    notifier.notify('You have been successfully registered!', 'success');
                    authentication.loginUser(user);
                }, function (error) {
                    notifier.notify('Your e-mail or password is uncorrect. Please try again!', 'error');
                });
        };
        
        $scope.logoutUser = function () {
            var deferred = $q.defer();

            authentication.logoutUser()
                .then(function (response) {
                    localStorage.removeItem('userAuth');
                    sessionStorage.removeItem('isAdmin');
                    notifier.notify('You have been successfully logged out!', 'success');
                    $location.path('/');
                    deferred.resolve(response);
                }, function (error) {
                    notifier.notify(error, 'error');
                    deferred.reject(error.data.error_description);
                });
        }
    }
]);
