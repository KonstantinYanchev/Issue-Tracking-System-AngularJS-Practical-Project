"use strict";

angular.module('IssueTrackingSystem.Users.Profile', [
        'IssueTrackingSystem.Users.ChangePassword'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/Profile', {
                templateUrl: 'js/users/profile.html',
                controller: 'ProfileController'
            });
        }
    ]).controller('ProfileController', [
        '$scope',
        'changePassword',
        function ($scope, changePassword) {
            $scope.changeUserPassword = function (changeUserPasswordData) {
                console.log(changeUserPasswordData);
                changePassword.changePassword(changeUserPasswordData);
            }
        }
    ]);