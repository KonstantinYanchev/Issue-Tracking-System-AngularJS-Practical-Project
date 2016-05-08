"use strict";

angular.module('IssueTrackingSystem.Issues.Issues', [])
    .factory('issues', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function getMyIssues(pageSize, pageNumber, orderBy) {
                var pageSize = pageSize || 5,
                    pageNumber = pageNumber || 1,
                    orderBy = orderBy || 'DueDate',
                    deferred = $q.defer();

                $http.get(BASE_URL +
                    'issues/me?pageSize=' +
                    pageSize +
                    '&pageNumber=' +
                    pageNumber +
                    '&orderBy=' +
                    orderBy)
                    .then(function (response) {
                        deferred.resolve(response.data.Issues);
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addIssue(issue) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'issues/', issue)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function editIssue(id, issue) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + id, issue)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            function changeStatus(id, statusId) {
                var deferred = $q.defer();

                $http.put(BASE_URL + 'issues/' + id + '/changestatus?statusid=' + statusId)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }
            
            function getIssueById(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/' + id)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    },function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }
            
            function getIssueComments(id) {
                var deferred = $q.defer();

                $http.get(BASE_URL + 'issues/' + id + '/comments')
                    .then(function (response) {
                        deferred.resolve(response.data);
                    },function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }
            
            function addCommentToIssue(id, comment) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'issues/' + id + '/comments', comment)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    },function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            }

            return {
                getMyIssues: getMyIssues,
                addIssue: addIssue,
                editIssue: editIssue,
                changeStatus: changeStatus,
                getIssueById: getIssueById,
                getIssueComments: getIssueComments,
                addCommentToIssue: addCommentToIssue
            };
        }
    ]);