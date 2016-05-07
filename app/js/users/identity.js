"use strict";
//Отговаря дали има текущ потребител или не;

angular.module('IssueTrackingSystem.Users.Identity', [])
    .factory('identity', [
        function () {
            return {
                isAuthenticated: function isAuthenticated() {
                    var accessToken = localStorage["userAuth"];
                    return accessToken;
                },
                isAdmin: function isAdmin() {
                    var isAdmin = sessionStorage["isAdmin"];
                    return isAdmin;
                }
            }
        }
    ]);