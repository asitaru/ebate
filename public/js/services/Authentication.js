angular.module('ebate.services.authentication', [])
    .service('Authentication', function( $http, $window) {

        var saveUser = function(user) {
            $window.localStorage['user'] = user;
        };

        var getUser = function() {
            return $window.localStorage['user'];
        };

        logout = function() {
            $window.localStorage.removeItem('user');
        };

        isLoggedIn = function() {
            if(getUser()) {
                return true;
            }
            else {
                return false;
            }
        }

        return {
            saveToken: saveUser,
            getToken: getUser,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

    })
