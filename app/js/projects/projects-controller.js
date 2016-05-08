"use strict";

angular.module('IssueTrackingSystem.Projects.ProjectController', [
        'IssueTrackingSystem.Projects.Projects'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/Projects/', {
                templateUrl: 'js/projects/projects.html',
                controller: 'ProjectsController'
            });
        }
    ]).controller('ProjectsController', [
        '$scope',
        'projects',
        'identity',
        'notifier',
        'Pagination',
        function ($scope, projects, identity, notifier, Pagination) {
            var countOfProjectPerPage = 8;

            $scope.pagination = Pagination.getNew(countOfProjectPerPage);
            
            projects.getAllProjects()
                .then(function (allProjects) {
                    $scope.projects = allProjects;
                    $scope.pagination.numPages = Math.ceil($scope.projects.length/$scope.pagination.perPage);
                }, function (error) {
                    console.log(error);
                });

            $scope.addProject = function (project) {
                project.labels = project.labels.split(',').map(function (label) {
                    return {Name: label};
                });

                project.priorities = project.priorities.split(',').map(function (priority) {
                    return {Name: priority};
                });

                projects.addProject(project)
                    .then(function (addedProject) {
                        notifier.notify('Project has been successfully added.', 'success');
                    }, function (error) {
                        notifier.notify(error, 'error');
                    });
            };
            
            identity.getAllUsers()
                .then(function (allUsers) {
                    $scope.users = allUsers.data;
                }, function (error) {
                    console.log(error);
                });
        }
    ]);
