"use strict";

angular.module('IssueTrackingSystem.Common', [])
    .controller('MainController', [
        '$scope',
        'authentication',
        'identity',
        function ($scope, authentication, identity) {
            $scope.isAuthenticated = identity.isAuthenticated;


        }
    ]).directive('userRequire', [
        'identity',
        function (identity) {
            return {
                restrict: 'A',
                link: function (scope) {
                    identity.getCurrentUser()
                        .then(function (user) {
                            scope.$parent.currentUser = user.data;
                        });
                }
            }
        }
    ]);