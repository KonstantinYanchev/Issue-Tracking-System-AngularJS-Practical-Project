"use strict";

angular.module('IssueTrackingSystem.DashboardController', [])
    .config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/Dashboard', {
                templateUrl: 'js/dashboard/dashboard.html',
                controller: 'DashboardController'
            });
        }
    ]).controller('DashboardController', [
        '$scope',
        'issues',
        'projects',
        'Pagination',
        function ($scope, issues, projects, Pagination) {
            $scope.pagination = Pagination.getNew(2);
            $scope.projectPagination = Pagination.getNew(5);

            issues.getMyIssues()
                .then(function (myAllIssues) {
                    $scope.myIssues = myAllIssues;
                }, function (error) {
                    console.log(error);
                });

            projects.getAllProjects()
                .then(function (allProjects) {
                    var assignedProjects = allProjects.filter(function (project) {

                    });

                    var myProjects = allProjects.filter(function (project) {
                        return project.Lead.Id == sessionStorage['userId'];
                    });

                    assignedProjects.forEach(function (project) {
                        projects.getAllProjectIssues(project.Id)
                            .then(function (allIssues) {
                                project.issues = allIssues;
                            }, function (error) {
                                console.log(error);
                            });
                    });

                    $scope.myProjects = myProjects;
                    $scope.assignedProjects = assignedProjects;
                    $scope.pagination.numPages = Math.ceil($scope.assignedProjects.length / $scope.pagination.perPage);
                    $scope.projectPagination.numPages = Math.ceil($scope.myProjects.length / $scope.projectPagination.perPage);
                }, function (error) {
                    console.log(error);
                });
        }
    ]).filter('assigned', function() {
        return function(input) {
            if(input){
                return input.filter(function(issue){
                    return issue.Assignee.Id === sessionStorage['userId'];
                });
            }
        }
    });