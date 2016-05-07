"use strict";
//Отговаря дали има текущ потребител или не;

angular.module('IssueTrackingSystem.Users.Identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

            function getCurrentUser() {
                var accessToken = localStorage['userAuth'],
                    deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $http.get(BASE_URL + 'users/me')
                    .then(function (response) {
                        sessionStorage['isAdmin'] = response.data.IsAdmin;
                        sessionStorage['userId'] = response.data.Id;
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function getAllUsers(){
                var deferred = $q.defer();
                $http.get(BASE_URL + 'users')
                    .then(function(response){
                        deferred.resolve(response);
                    },function(error){
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function isAuthenticated() {
                var accessToken = localStorage['userAuth'];
                return accessToken;
            }

            function isAdmin() {
                var isAdmin = sessionStorage['isAdmin'];
                return isAdmin;
            }


            return {
                getCurrentUser: getCurrentUser,
                getAllUsers: getAllUsers,
                isAuthenticated: isAuthenticated,
                isAdmin: isAdmin
            }
        }
    ]);