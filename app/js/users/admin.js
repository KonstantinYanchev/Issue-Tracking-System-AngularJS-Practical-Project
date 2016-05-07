"use strict";

angular.module('IssueTrackingSystem.Users.Admin', [])
    .factory('admin', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function makeAdmin(user) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'users/makeadmin', user)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            return {
                makeAdmin: makeAdmin
            }
        }
    ]);