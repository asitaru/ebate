angular.module('ebate.services.authentication', [])
    .service('Authentication', function( $http, $window) {

        var fetchUser = function() {

            return $http.get('/fetchUser').then(function(response) {

                return response.user;
            });
        };

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
            fetchUser: fetchUser,
            saveUser: saveUser,
            getUser: getUser,
            isLoggedIn: isLoggedIn,
            logout: logout
        };

    })
