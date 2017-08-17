angular.module('leado')
    .controller('mainController',['$scope', 'mainFactory',,  function ($scope, mainFactory) {
        mainFactory.getHooks(1, 10).then(function (data) {
            console.log(data);
        })
    }])


