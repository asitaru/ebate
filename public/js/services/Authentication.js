angular.module('ebate.services.authentication', [])
    .service('Authentication', function( $http, $window) {

        var saveToken = function(token) {
            $window.localStorage['token'] = token;
        };

        var getToken = function() {
            return $window.localStorage['token'];
        };

        logout = function() {
            $window.localStorage.removeItem('token');
        };

        isLoggedIn = function() {
            if(getToken()) {
                return true;
            }
            else {
                return false;
            }
        }

        return {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

    })
