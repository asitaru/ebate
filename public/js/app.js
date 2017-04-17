var app = angular.module('ebate',
[
'ngRoute',
'ebate.controllers.main',
'ebate.controllers.poll',
'ebate.controllers.login',
'ebate.services.authentication'
]);


app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider.

            when('/', {
                templateUrl: 'views/home.html',
                controller: 'main'
            }).
            when('/:pollId', {
                templateUrl: 'views/poll.html',
                controller: 'poll'
            }).
            when('/user/:token', {
                template: " ",
                controller: 'login'
            })
        }
    ]);
