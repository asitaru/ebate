angular.module('ebate.controllers.login', [])
    .controller('login', function( $scope, $location, $timeout, Authentication) {

        $http.get('/fetchUser').then(

            user => {
                Authentication.saveUser(user);
                $location.path('/');
            },
            err => {
                alert("You are not logged in!");
                $timeout($location.path('/'), 1000);
            }
        )

    })
