angular.module('leado')
    .factory('mainFactory',['$http', function ($http) {
        var temp    = {};

        temp.getHooks   = function (page, limit) {
            return $http.get('/apis/hooks/?page=' + page+ '&limit=' + limit).success(function(data){
                temp = data;
            });
        }

        return temp;
    }])