angular.module('ebate.controllers.main', [])
    .controller('main', function($scope, $http, $location, $window, Authentication) {

        $scope.checkUserState = function(){
           return Authentication.isLoggedIn();
        };

        $scope.displayName = function(){
            if($scope.checkUserState()) {
                return Authentication.getUser().displayName;
            }
        };

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

        //Select an ebate
        $scope.selectEbate = function(ebate){
            $location.path("/ebate/" + ebate._id);
        };

        //Create a new ebate
        $scope.newEbate = function(){
            $location.path("/new-ebate");
        };

        $scope.userPolls = function(){
            $location.path('/user-polls');
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
