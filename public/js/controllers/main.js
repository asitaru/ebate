angular.module('ebate.controllers.main', [])
    .controller('main', function($scope, $http, $location, Authentication) {

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

        $scope.login = function(user) {
            return $http.get('api/login').then(
                data => {
                    Authentication.saveToken(data.token);
                },
                error => {
                    alert("Could not find account!");
                }
            )
        };

        $scope.logout = function() {
            $scope.authenticated = false;
            Authentication.logout();
        }

    });
