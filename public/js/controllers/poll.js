angular.module('ebate.controllers.poll', ["chart.js"])
    .controller('poll', function($scope,$route, $http, $routeParams, $location, Poll) {
        //get the poll id from url
        $scope.pollId = $routeParams.pollId;

        //get the poll data from backend
        $http.get('/api/ebates/' + $scope.pollId).then(

            data => {
                $scope.ebate = data.data;
                $scope.chartConstructor();

            },
            err => {
                console.log('Error: ' + err);
            }
        );

        //function that builds the chart
        $scope.chartConstructor = function(){
            $scope.labels = [];
            $scope.data = [];
            $scope.options = {legend : { display: true, position: 'bottom', labels: {fontSize: 30, boxWidth:30, fontFamily: "sans-serif"}}}
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            $scope.ebate.options.forEach( function(option) {
                $scope.labels.push(option.name);
                $scope.data.push(option.votes);
            })
        };

        $scope.vote = function(option){

            var request = {
                option: $scope.ebate.options.indexOf(option),
                userId: undefined

            }

            $http.put('/api/ebates/' + $scope.pollId, request).then(

                function(response) {
                    if(response.data.error) {
                        alert("User/IP already voted!")
                    }
                    else {
                        console.log(response.data.message);
                        $route.reload();
                    }
                },
                function(response) {
                    alert("Could not vote at this time");
                }

            )
        }

    })
