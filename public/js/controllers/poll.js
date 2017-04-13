angular.module('ebate.controllers.poll', ["chart.js"])
    .controller('poll', function($scope,$route, $http, $routeParams, $location) {
        //get the poll id from url
        $scope.pollId = $routeParams.pollId;

        //function that builds the chart
        $scope.chartConstructor = function(){
            $scope.labels = [];
            $scope.data = [];
            $scope.options = {legend : { display: true, position: 'bottom', labels: {fontSize: 25, boxWidth:25, fontFamily: "sans-serif"}}}
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            $scope.ebate.options.forEach( function(option) {
                $scope.labels.push(option.name);
                $scope.data.push(option.votes);
            })
        };

        //get the poll data from backend
        $http.get('/api/ebates/' + $scope.pollId).then(
            //on succesfull retrieval, store the data and build a chart based on it
            data => {
                $scope.ebate = data.data;
                $scope.chartConstructor();

            },
            err => {
                console.log('Error: ' + err);
            }
        );

        //Vote on predefined category function
        $scope.vote = function(option){

            var request = {
                option: $scope.ebate.options.indexOf(option),
                userId: undefined

            }

            //update promise
            $http.put('/api/ebates/' + $scope.pollId, request).then(

                function(response) {
                    //alert if the user already voted
                    if(response.data.error) {
                        alert("You can only vote once per poll!")
                    }
                    //refresh the page to see the result if the vote went trough
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
