angular.module('ebate.services.authentication', [])
    .service('Authentication', function( $http, $window, $location) {

        var saveUser = function(user){
            $window.localStorage['user'] = JSON.stringify(user);
            $location.path('/user-polls');
        };

        var getUser = function(){
            return JSON.parse($window.localStorage['user']).data;
        }

        var saveToken = function(token) {
            $window.localStorage['token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['token'];
        };

        logout = function() {
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('user');
            $http.get('/api/logout');
        };

        isLoggedIn = function() {
            return getToken();
        };

        return {
            saveUser: saveUser,
            getUser: getUser,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

    });
