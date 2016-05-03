"use strict";
//Отговаря дали има текущ потребител или не;

angular.module('IssueTrackingSystem.Users.Identity', [])
    .factory('identity', [
        function () {
            var userEmail = 'genata@abv.bg';
            var accessToken = 'pZo90kvHq04v3wS-OP2aJaiT7SobhOyiUMV5zFxhkiSfauPF5DChLqMORlsG0AnQWr_MWPo02owbC7AKuzWkqtsAeEHsMAFU4uhnTBpLGDIUnOzO89LHSwFw3DkqVA3B78XNKUKsgRxHkdNmRO4pfwnAQ52gtyGfoAMcLh-JctJYzfj-vCaZzF-7WFdnaXnmd8qGezIBf2KGegvdKhkvma4aZ8G0jqx3BjvnqJQ5qS7Di-6nEhZT2kt7umgkWZ0UcaQKoO3vhyltlER4-aZTtHcFNVh_KjPvTHQnL_r4rz0Mmk2jDbpbaJ26OOPb1GUe3DEQOz44O7DY7P02IiwchfDITGU3fiE8LcEwThdw4sYB_KE4Y1E8ZAZmAb_jOD3GIbIH2NhmP1o81V4K3wwpOQHJYkflNn0KyU39y5VJu2WKq2TXsyO5O27W3ZkhcLkUJPLzzOFp0dEUlQLXE6eOCwpUIxgdBMCcK4aS4e717kQ';
            
            return {
                getCurrentUser: function () {
                    return {
                        userEmail: userEmail
                    }
                },
                isAuthenticated: function () {
                    return true;
                }
            };
        }
    ]);