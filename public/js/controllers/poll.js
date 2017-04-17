angular.module('ebate.controllers.poll', ["chart.js"])
    .controller('poll', function( $scope, $route, $http, $routeParams, $location, $timeout, Authentication) {
        //get the poll id from url
        $scope.pollId = $routeParams.pollId;

        //user input option
        $scope.userOption = "";
        //get the newOption state
        $scope.newOptionState = false;

        //helper function that checks if the user is logged in
        $scope.checkUserState = function(){
            return Authentication.isLoggedIn();
        };

        //function that builds the chart
        $scope.chartConstructor = function(){
            $scope.labels = [];
            $scope.data = [];
            $scope.options = {legend : { display: true, position: 'bottom', labels: {fontSize: 25, boxWidth:25, fontFamily: "sans-serif"}}};
            $scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];
            $scope.ebate.options.forEach( function(option) {
                $scope.labels.push(option.name);
                $scope.data.push(option.votes);
            })
        };

        //get the poll data from backend
        $http.get('/api/ebates/' + $scope.pollId).then(
            //on succesfull retrieval, store the data and build a chart based on it
            function(data){
                $scope.ebate = data.data;
                $scope.chartConstructor();

            },
            function(err){
                alert("Wrong path!");
                $timeout($location.path('/'), 1000);
            }
        );

        //Helper function to handle PUT responses
        $scope.responseHandler = function(response) {
            //alert if the user already voted
            if(response.data.error) {
                alert("You can only vote once per poll!")
            }
            //refresh the page to see the result if the vote went trough
            else {
                console.log(response.data.message);
                $route.reload();
            }
        };

        //Vote on predefined category function
        $scope.vote = function(option){

            var request = {
                option: $scope.ebate.options.indexOf(option),
                userId: undefined

            };

            //include user if logged in
            if($scope.checkUserState()){
                request.userId = Authentication.getUser().userId;
            }

            //update promise
            $http.put('/api/ebates/' + $scope.pollId, request).then(

                function(response) {
                    $scope.responseHandler(response)
                },
                function(response) {
                    alert("Oops, something happened, please try again later!");
                }

            )
        };

        $scope.newOption = function() {
            if($scope.newOptionState){

                var request = {
                    option: $scope.userOption,
                    userId: Authentication.getUser().userId
                };

                $http.put('/api/ebates/' + $scope.pollId + '/new' , request).then(

                    function(response){
                        $scope.responseHandler(response)
                    },

                    function() {
                        alert("Oops, something happened, please try again later!");
                    }
                )
            }
            $scope.newOptionState = !$scope.newOptionState;
        };

    });
