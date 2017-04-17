angular.module('ebate.services.authentication', [])
    .service('Authentication', function( $http, $window) {

        var user;

        var saveToken = function(token) {
            $window.localStorage['token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['token'];
        };

        logout = function() {
            $window.localStorage.removeItem('token');
            $http.get('/api/logout');
            user = undefined;
        };

        isLoggedIn = function() {
            return getToken();
        };

        return {
            user: user,
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

    });
