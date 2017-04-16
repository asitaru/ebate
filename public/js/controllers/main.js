angular.module('ebate.controllers.main', ['ngCookies'])
    .controller('main', function($scope, $http, $location, $window, $cookies, Authentication) {

        console.log($cookies.getAll());
        $scope.authenticated = Authentication.isLoggedIn();

        //Get all the ebates from the database
        $http.get('/api/ebates').then(

            //get the ebates
            data => {
                $scope.ebates = data.data;
                console.log($scope.ebates);
            },
            err => {
                console.log('Error: ' +  err);
            })

        //
        $scope.selectEbate = function(ebate){
            $location.path("/" + ebate._id);
        }

        $scope.logout = function() {
            $scope.authenticated = false;
            Authentication.logout();
        }

    });
