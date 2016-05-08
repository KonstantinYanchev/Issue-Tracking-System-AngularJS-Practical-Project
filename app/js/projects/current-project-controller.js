"use strict";

angular.module('IssueTrackingSystem.Projects.CurrentProjectController', [
        'IssueTrackingSystem.Projects.Projects'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/Projects/:id', {
                templateUrl: 'js/projects/currentProject.html',
                controller: 'CurrentProjectController'
            });
        }
    ]).controller('CurrentProjectController', [
        '$scope',
        '$routeParams',
        'identity',
        'projects',
        'notifier',
        'Pagination',
        function ($scope, $routeParams, identity, projects, notifier, Pagination) {
            var currentId = $routeParams.id,
                countOfIssuesPerPage = 8;

            $scope.pagination = Pagination.getNew(countOfIssuesPerPage);

            projects.getProjectById(currentId)
                .then(function (project) {
                    $scope.project = project;
                    $scope.project.leadId = project.Lead.Id;
                    $scope.project.prioritiesStr = (project.Priorities.map(function (priority) {
                        return priority.Name;
                    })).join();
                    $scope.project.labelsStr = (project.Labels.map(function (label) {
                        return label.Name;
                    })).join();
                }, function (error) {
                    console.log(error);
                });

            projects.getAllProjectIssues(currentId)
                .then(function (allIssues) {
                    $scope.issues = allIssues;
                    $scope.pagination.numPages = Math.ceil($scope.issues.length / $scope.pagination.perPage);
                }, function (error) {
                    console.log(error);
                });

            $scope.editProject = function(project) {
                if (project.labels) {
                    project.labels = project.labels.split(',').map(function (label) {
                        return {Name: label};
                    });
                }

                if (project.priorities) {
                    project.priorities = project.priorities.split(',').map(function (priority) {
                        return {Name: priority};
                    });
                }

                projects.editProject(currentId, project)
                    .then(function (editedProject) {
                        $scope.project = editedProject;
                        notifier.notify('Project has been successfully edited.', 'success');
                    }, function (error) {
                        console.log(error);
                    });
            }

            $scope.lead = function(){
                if($scope.project) {
                    return $scope.project.leadId === sessionStorage.userId;
                }
            }
        }
    ]).filter('onlyAsigned', function() {

    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(input, bool) {
        var output;
        if(bool){
            output = input.filter(function(e){
                return e.Assignee.Id === sessionStorage.userId;
            })
        }
        else{
            output = input;
        }
        return output;
    }

});