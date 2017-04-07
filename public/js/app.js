var app = angular.module('ebate', ['ngRoute', 'ebate.controllers.MainController']);


app.config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider.

            when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            });
        }
    ]);
