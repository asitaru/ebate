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
            $http.get('/api/logout');
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
            saveUser: saveUser,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

    })
