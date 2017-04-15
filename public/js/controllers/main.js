angular.module('ebate.controllers.main', [])
    .controller('main', function($scope, $http, $location, $window, Authentication) {

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

        $scope.login = function() {
            var url = '/api/login',
                width = 1000,
                height = 650,
                top = (window.outerHeight - height) / 2,
                left = (window.outerWidth - width) / 2;
            $window.open(url, 'twitter_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);

            // return $http.get('api/login').then(
            //     data => {
            //         Authentication.saveToken(data.token);
            //     },
            //     error => {
            //         alert("Could not find account!");
            //     }
            // )
            console.log("logged in!");
        };

        $scope.logout = function() {
            $scope.authenticated = false;
            Authentication.logout();
        }

    });
