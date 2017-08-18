angular.module('leado')
    .factory('mainFactory',['$http', function ($http) {
        var temp    = {};

        temp.getHooks   = function (page, limit) {
            return $http.get('/apis/hooks/?page=' + page+ '&limit=' + limit).success(function(data){
                temp = data;
            });
        }

        temp.getHookById   = function (id) {
            return $http.get('/apis/hooks/' + id).success(function(data){
                temp = data;
            });
        }

        temp.updateHookById   = function (update) {
            return $http.post('/apis/hooks/update/', update).success(function(data){
                temp = data;
            });
        }


        temp.removeHook   = function (id) {
            return $http.delete('/apis/hooks/' + id).success(function(data){
                temp = data;
            });
        }

        temp.getActions   = function () {
            return $http.get('/apis/actions/').success(function(data){
                temp = data;
            });
        }

        return temp;
    }])