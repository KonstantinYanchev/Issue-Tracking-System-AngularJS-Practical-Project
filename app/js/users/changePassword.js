"use strict";

angular.module('IssueTrackingSystem.Users.ChangePassword', [])
    .factory('changePassword', [
        '$http',
        '$q',
        'notifier',
        'BASE_URL',
        function ($http, $q, notifier, BASE_URL) {
            function changePassword(newPasswordData) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', newPasswordData)
                    .then(function (response) {
                        notifier.notify('You have successfully changed your password!', 'success');
                        deferred.resolve(response);
                    }, function (error) {
                        notifier.notify(error.data.error_description, 'error');
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            return {
                changePassword: changePassword
            };
        }
    ]);