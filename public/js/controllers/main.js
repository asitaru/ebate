angular.module('ebate.controllers.main', [])
    .controller('main', function($scope, $http, $location, Poll) {
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

    });
