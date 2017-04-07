angular.module('ebate.controllers.MainController', [])
    .controller('MainController', function($scope, $http) {

        $http.get('/api/ebates').then(

            //get the ebates
            data => {
                $scope.ebates = data.data;
                console.log($scope.ebates);
            },
            err => {
                console.log('Error: ' +  err);
            })

    });
