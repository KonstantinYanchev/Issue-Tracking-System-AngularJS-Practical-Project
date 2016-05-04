"use strict";

angular.module('IssueTrackingSystem.Common', [])
    .controller('MainController', [
        '$scope',
        'identity',
        function ($scope, identity) {
            $scope.isAuthenticated = identity.isAuthenticated();
        }
    ]);