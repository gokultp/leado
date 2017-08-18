angular
.module('leado', ['ngMaterial'])

angular.module('leado')
    .controller('mainController',['$scope', 'mainFactory', '$mdDialog',  function ($scope, mainFactory, $mdDialog) {
        $scope.hooks    = [];
        function getHooks() {
            mainFactory.getHooks(1, 10).then(function (temp) {
                if(temp.data.status){
                    $scope.hooks    = temp.data.data;
                }
            });
        }
        getHooks();
        $scope.newHook  = function (ev) {
            $scope.editHook({}, ev);
        }

        $scope.deleteHook   = function (hook) {
            mainFactory.removeHook(hook._id).then(function (temp) {
                getHooks()         
            })
        }

        $scope.editHook = function (hook, ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'edit.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                locals :{
                    hook : hook
                }
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        }

        function DialogController($scope, $mdDialog, hook, mainFactory) {
            $scope.hook = hook;
            $scope.selectedTab  = 0;
            $scope.dataFields = getFields($scope.hook.sampleData);
            if(!$scope.hook.filter || !$scope.hook.filter[0] || !$scope.hook.filter[0][0]){
                $scope.hook.filter = [[{}]];
            }
            $scope.conditions   = [
                {key: 'eq', value: 'Equal to'},
                {key: 'ne', value: 'Not equal to'},
                {key: 'gt', value: 'Greater than'},
                {key: 'gte', value: 'Greater than or equal to'},
                {key: 'lt', value: 'Less than'},
                {key: 'lte', value: 'Less than or equal to'},
                {key: 'in', value: 'In'},
                {key: 'nin', value: 'Not in'},
                {key: 'subStrOf', value: 'Substring of'},
                {key: 'nSubStrOf', value: 'Not Substring of'},
            ]
            $scope.hide = function() {
                $mdDialog.hide();
            };
        
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.testHook = function () {
                $scope.hook.testing = true
                mainFactory.getHookById($scope.hook._id).then(function (temp) {
                    if(temp.data.status){
                        $scope.hook    = temp.data.data;
                        if(!$scope.hook.filter || !$scope.hook.filter[0] || !$scope.hook.filter[0][0]){
                            $scope.hook.filter = [[{}]];
                        }
                        $scope.hook.testing = false;
                        
                        if($scope.hook.sampleData){
                            $scope.dataFields = getFields($scope.hook.sampleData)                            
                            $scope.hook.tested = true;
                            
                        }
                    }
                })
            }

            $scope.log  = function (data) {
                console.log(data)
            }

            function getFields(sampleData) {
                if(sampleData){
                    return Object.keys(sampleData).map(function (field) {
                        return { key: field, value: sampleData[field]}
                    })
                }
                return []
            }

            $scope.addFilter    = function (filters) {
                filters.push({})
            }
            $scope.addAndFilter    = function (filters) {
                filters.push([{}])
            }

            $scope.saveName  =function(id, name){
                mainFactory.updateHookById({
                    id : id,
                    update : {name: name}
                }).then(function (temp) {
                    if(temp.data.status){
                        $scope.hook._id = temp.data.data._id;
                        $scope.hook.url = temp.data.data.url;
                        $scope.selectedTab = 1;
                    }
                })
            }


            $scope.saveFilter   = function (id, filters) {
                filters =   filters.map(function (filter) {
                    return filter.filter(function (subFilter) {
                        return subFilter.dataField != null && subFilter.condition != null && subFilter.referenceVal;
                    })
                });

                mainFactory.updateHookById({
                    id : id,
                    update : {filter: filters}
                }).then(function (temp) {
                    if(temp.data.status){
                        $scope.selectedTab = 3;
                    }
                })

                
            }


        }
    }])


