angular.module('ebate.controllers.user-action', [])
    .controller('user-action', function($scope, $http, $location, Authentication){

        $scope.ebateName = "";
        $scope.options = [{name: ""}, {name: ""}];

        $scope.addOption = function(){
            $scope.options.push({name: ""});
        };

        $scope.removeOption = function() {
            if($scope.options.length > 2){
                $scope.options.pop();
            }
        };

        $scope.postEbate = function() {

            var request = {
                name: $scope.ebateName,
                userId: Authentication.getUser().userId,
                options: []
            };

            //used to validate the form
            var formValid = true;

            $scope.options.forEach(function(option) {
                if(!option.name) {
                    formValid = false;
                }
                request.options.push(option.name);
            });

            if(!request.name || !request.userId){
                formValid = false;
            }

            if(formValid){
                $http.post('/api/ebates', request).then(
                    function(data) {
                        $location.path('/ebate/' + data.data._id);
                    }
                )
            }
            else{
                alert("One or more fields are empty or you are not authorized to make this request!");
            }

        };

        //USER EBATES
        $scope.userEbates = [];
        $http.put('/api/ebates-by-user', {userId: Authentication.getUser().userId}).then(

            //get the ebates
            function(data){
                $scope.userEbates = data.data;
                console.log($scope.userEbates);
            },
            function(err){
                console.log('Error: ' +  err);
            });

    });