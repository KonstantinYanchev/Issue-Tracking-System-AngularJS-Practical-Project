"use strict";

angular.module('IssueTrackingSystem.Users.ChangePassword', [])
    .factory('changePassword', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function changePassword(newPasswordData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', newPasswordData)
                    .then(function (response) {
                        console.log(response);
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            return {
                changePassword: changePassword
            };
        }
    ]);