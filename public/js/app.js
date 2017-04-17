var app = angular.module('ebate',
[
'ngRoute',
'ebate.controllers.main',
'ebate.controllers.poll',
'ebate.controllers.login',
'ebate.controllers.user-action',
'ebate.services.authentication'
]);


app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider.

            when('/', {
                templateUrl: 'views/home.html',
                controller: 'main'
            }).
            when('/ebate/:pollId', {
                templateUrl: 'views/poll.html',
                controller: 'poll'
            }).
            when('/user/:token', {
                template: " ",
                controller: 'login'
            }).
            when('/new-ebate', {
                templateUrl: 'views/newpoll.html',
                controller: 'user-action'
            }).
            when('/user-polls', {
                templateUrl: 'views/user-polls.html',
                controller: 'user-action'
            })
        }
    ]);
