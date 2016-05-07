"use strict";

angular.module('IssueTrackingSystem.Users.UsersController', [
        'IssueTrackingSystem.Users.Admin'
    ]).config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/Users', {
            templateUrl: 'js/users/users.html',
            controller: 'UsersController'
        });
    }]).controller('UsersController', [
        '$scope',
        'identity',
        'admin',
        'notifier',
        'Pagination',
        function UsersController($scope, identity, admin, notifier, Pagination) {
            $scope.pagination = Pagination.getNew(8);

            identity.getAllUsers()
                .then(function (allUsers) {
                    $scope.users = allUsers.data;
                    $scope.pagination.numPages = Math.ceil($scope.users.length / $scope.pagination.perPage);
                }, function (error) {
                    console.log(error);
                });

            $scope.promote = function(id, username){
                var currentUser={UserId:id};
                admin.makeAdmin(currentUser)
                    .then(function(success){
                            notifier.notify("Assigned administrator role to " + username,'success');
                        },
                        function(error){
                            console.log(error);
                        });
            };
        }]);


