"use strict";

angular.module('IssueTrackingSystem.Extensions.Notifier', [])
    .factory('notifier', [
        'ngNotify',
        function (ngNotify) {
            ngNotify.config({
                theme: 'pitchy',
                position: 'bottom',
                sticky: false,
                html: true,
                target: '#modular'
            });

            function notify(message, type) {
                ngNotify.set(message, type);
            }

            return {
                notify: notify
            }
        }
    ]);