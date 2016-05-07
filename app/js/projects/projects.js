"use strict";

angular.module('IssueTrackingSystem.Projects.Projects',[])
    .factory('projects',[
        '$http',
        '$q',
        'BASE_URL',
        function($http, $q, BASE_URL){
            function getAllProjects(){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/')
                    .then(function (response) {
                        deferred.resolve(response.data);
                    },function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };
            function getAllProjectIssues(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id + '/issues')
                    .then(function (response) {
                        deferred.resolve(response.data);
                    },function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            function getProjectById(id){
                var deferred = $q.defer();

                $http.get(BASE_URL + 'projects/' + id)
                    .then(function (response) {
                        deferred.resolve(response.data);
                    },function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            };

            function addProject(project){
                var deferred = $q.defer();

                $http.post(BASE_URL + 'projects', project)
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            function editProject(id, project){
                var deferred = $q.defer();

                $http.put(BASE_URL + 'projects/' + id, project)
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function (error) {
                        deferred.reject(error.data.error_description);
                    });

                return deferred.promise;
            };

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById,
                addProject: addProject,
                getAllProjectIssues: getAllProjectIssues,
                editProject: editProject
            }
        }]);