"use strict";

angular.module('IssueTrackingSystem.Issues.IssueController', [
        'IssueTrackingSystem.Projects.Projects',
        'IssueTrackingSystem.Issues.Issues'
    ]).config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/Issues/:id', {
                templateUrl: 'js/issues/issue.html',
                controller: 'IssueController'
            });
        }
    ]).controller('IssueController', [
        '$scope',
        '$routeParams',
        'issues',
        'projects',
        'identity',
        'notifier',
        function ($scope, $routeParams, issues, projects, identity, notifier) {
            var currentId = $routeParams.id;


            issues.getIssueById(currentId)
                .then(function (response) {
                    $scope.issue = response;
                    $scope.issue.projectId = response.Project.Id;
                    $scope.issue.dueDate = new Date(response.DueDate.split('T')[0]);
                    $scope.issue.assigneeId = response.Assignee.Id;
                    $scope.issue.priorityId = response.Priority.Id;
                    
                    projects.getProjectById($scope.projectId)
                        .then(function (project) {
                            $scope.priorities = project.Priorities;
                        }, function (error) {
                            console.log(error);
                        });
                }, function (error) {
                    console.log(error);
                });
            
            $scope.addCommentToIssue = function (comment) {
                issues.addCommentToIssue(currentId, comment)
                    .then(function (response) {
                        $scope.comments = response;
                    }, function (error) {
                        console.log(error);
                    });
            };

            issues.getIssueComments(currentId)
                .then(function (comments) {
                    $scope.comments = comments;
                }, function (error) {
                    console.log(error);
                });

            $scope.editIssue = function (issue) {
                issue.editIssue(currentId, issue)
                    .then(function (editedIssue) {
                        $scope.issue = editedIssue;
                        $scope.issue.projectId = editedIssue.Project.Id;
                        notifier.notify('Issue has beed edited.', 'success');
                    }, function (error) {
                        notifier.notify(error, 'error');
                    });
            };
            
            $scope.changeStatus = function (statusId) {
                issues.changeStatus(currentId, statusId)
                    .then(function (changedStatus) {
                        $scope.issue.availableStatuses = changedStatus;
                        notifier.notify('Issue\'s status has been changed!', 'success' );
                    }, function (error) {
                        notifier.notify(error, 'error');
                    });
            };
            
            identity.getAllUsers()
                .then(function (allUsers) {
                    $scope.allUsers = allUsers;
                }, function (error) {
                    console.log(error);
                });

            $scope.isAssignee = function(){
                if($scope.issue) {
                    return $scope.issue.Assignee.Id === sessionStorage.userId;
                }
            };

            $scope.isLeader = function(){
                if($scope.issue) {
                    return $scope.issue.Author.Id === sessionStorage.userId;
                }
            };
        }
    ]);