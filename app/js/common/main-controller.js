"use strict";

angular.module('IssueTrackingSystem.Common', [])
    .controller('MainController', [
        '$scope',
        '$http',
        'identity',
        function ($scope, $http, identity) {
            identity.getCurrentUser()
                .then(function (currentUser) {
                    $scope.currentUser = currentUser;
                });

            $scope.isAuthenticated = identity.isAuthenticated();
        }
    ]);