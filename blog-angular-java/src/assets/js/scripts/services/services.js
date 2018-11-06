app.service("AppService", function ($http, $window) {
    this.Token = function () {
        return $http({
            method: 'PUT',
            url: '/token',
            async: false
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            $window.location.href = "/errors/505";
        });
    },
    this.GetSession = function () {
        return $http({
            method: 'GET',
            url: '/getsession',
            async: false
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            $window.location.href = "/errors/505";
        });
    },
    this.CheckAuthorPost = function () {
        return $http({
            method: 'PUT',
            url: $window.location.pathname + '/checkauthor',
            async: false
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            $window.location.href = "/errors/505";
        });
    };
});