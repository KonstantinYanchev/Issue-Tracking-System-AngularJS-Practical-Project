"use strict";

angular.module('IssueTrackingSystem.Issues.AddIssueController', [])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        '$location',
        'identity',
        'projects',
        'issues',
        'notifier',
        function ($scope, $routeParams, $location, identity, projects, issues, notifier) {
            $scope.issue = { projectId: $routeParams.Id };
            $scope.addIssue = function (issue) {
                issues.addIssue(issue)
                    .then(function (addedIssue) {
                        notifier.notify('Issue has beed successfully added!', 'success');
                        $location.path('/Issues/' + addedIssue.Id);
                    }, function (error) {
                        notifier.notify(error, 'error');
                    });
                
                identity.getAllUsers()
                    .then(function (allUsers) {
                        $scope.users = allUsers.data;
                    }, function (error) {
                        console.log(error);
                    });

                projects.getProjectById($routeParams.id)
                    .then(function (project) {
                        $scope.priorities = project.Priorities;
                        $scope.issue.leadId = project.LeadId;
                    }, function (error) {
                        console.log(error);
                    });

                $scope.lead = function () {
                    return $scope.issue.leadId === sessionStorage.userId;
                }
            }
        }
    ]);