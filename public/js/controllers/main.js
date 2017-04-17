angular.module('ebate.controllers.main', [])
    .controller('main', function($scope, $http, $location, $window, Authentication) {

        $scope.checkUserState = function(){
           return Authentication.isLoggedIn();
        };

        if($scope.checkUserState()){
            $scope.user = Authentication.user;
            console.log($scope.user);
        }

        //Get all the ebates from the database
        $http.get('/api/ebates').then(

            //get the ebates
            function(data){
                $scope.ebates = data.data;
                console.log($scope.ebates);
            },
            function(err){
                console.log('Error: ' +  err);
            });

        //
        $scope.selectEbate = function(ebate){
            $location.path("/" + ebate._id);
        };

        $scope.login = function() {
            $window.location = $window.location.protocol + '//' + $window.location.host + '/api/login';
        };

        $scope.logout = function() {
            $scope.authenticated = false;
            $scope.user = undefined;
            Authentication.logout();
        }

    });
