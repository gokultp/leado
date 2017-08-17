angular
.module('leado', [])

angular.module('leado')
    .controller('mainController',['$scope', 'mainFactory',  function ($scope, mainFactory) {
        $scope.hooks    = [];
        mainFactory.getHooks(1, 10).then(function (temp) {
            if(temp.data.status){
                $scope.hooks    = temp.data.data;
            }
        })
    }])


