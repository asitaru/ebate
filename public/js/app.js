var app = angular.module('ebate', ['ngRoute', 'ebate.controllers.main', 'ebate.controllers.poll','ebate.services.poll']);


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
            })
        }
    ]);
