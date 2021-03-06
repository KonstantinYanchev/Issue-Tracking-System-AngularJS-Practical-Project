"use strict";
//Отговаря за логване/регистриране/логоут-ване на потребител;

angular.module('IssueTrackingSystem.Users.Authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        '$location',
        'BASE_URL',
        function ($http, $q, $location, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Register', user, {dataType: 'json/application'})
                    .then(function (response) {
                        deferred.resolve(response.data);
                        console.log(response);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            function loginUser(user) {
                var deferred = $q.defer(),
                    userAsString = 'username=' + user.email + '&password=' + user.password + '&grant_type=password';
                $http.post(BASE_URL + 'api/Token', userAsString, {'Content-Type': 'application/x-www-form-urlencoded'})
                    .then(function (response) {
                        //console.log(response.data.access_token);
                       localStorage['userAuth'] = response.data.access_token;
                        $location.path('/Dashboard');
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            function logoutUser() {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/Account/Logout')
                    .then(function (response) {
                        console.log(response);
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser
            };
        }
    ]);