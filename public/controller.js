angular
.module('leado', ['ngMaterial'])

angular.module('leado')
    .controller('mainController',['$scope', 'mainFactory', '$mdDialog', '$mdMenu', function ($scope, mainFactory, $mdDialog, $mdMenu) {
        $scope.hooks    = [];
        function getHooks() {
            mainFactory.getHooks(1, 10).then(function (temp) {
                if(temp.data.status){
                    $scope.hooks    = temp.data.data;
                }
            });
        }


        mainFactory.getActions().then(function (temp) {
            if(temp.data.status){
                $scope.actions  = temp.data.data;
            }
        });


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
                    hook : hook,
                    actions : $scope.actions
                }
            })
            .then(function(answer) {
                getHooks();
                
            }, function() {
                getHooks();
                
            });
        }

        function DialogController($scope, $mdDialog, hook, actions, mainFactory, $mdMenu) {
            $scope.hook = hook;
            $scope.actions = actions;
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

            $scope.testHook = function () {
                $scope.hook.testing = true
                mainFactory.getHookById($scope.hook._id).then(function (temp) {
                    if(temp.data.status){
                        $scope.hook    = temp.data.data;
                        $scope.hook.mapping = {};
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

            $scope.setAction    = function (action) {
                $scope.action   = JSON.parse(action);
            }

            $scope.saveMapping  = function (id, mapping) {
                mainFactory.updateHookById({
                    id : id,
                    update : {
                        mapping: mapping,
                        actionId: $scope.action._id
                    }
                }).then(function (temp) {
                        $mdDialog.hide();
                    
                })
            }


        }
    }])


