angular.module('ebate.controllers.login', [])
    .controller('login', function( $scope, $location, $http, $routeParams, Authentication) {

        if(!Authentication.isLoggedIn()){
            Authentication.saveToken($routeParams.token);
            $http.get('api/me').then(
                function(user){
                    Authentication.saveUser(user);
                    $location.path('/');
                }
            )
        }

    });
