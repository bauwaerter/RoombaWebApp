'use strict';

angular.module('myApp.home', [])

.controller('HomeCtrl', ['$scope', '$state', 'MachineService', function($scope, $state, MachineService) {

        $scope.roomba = {
            initCoords: { x: null, y: null },
            drivingInstructions: [""]
        };

        $scope.room = {
            coordinates: { x: null, y: null },
            dirtLocations: [{ x: null, y: null }]
        };

        $scope.machineService = new MachineService();

        $scope.readFile = function($fileContent){
            $scope.machineService.initWithFile($fileContent);
        };

        $scope.addDirtLocation = function(){
            $scope.machineService.addDirtLocation();
        };
        $scope.deleteDirtLocation = function(index){
            $scope.machineService.deleteDirtLocation(index);
        };

        $scope.addDrivingInstruction = function(){
            $scope.machineService.addDrivingInstruction();
        };

        $scope.deleteDrivingInstruction = function(index){
            $scope.machineService.deleteDrivingInstruction(index);
        };

        $scope.goRoombaGo = function(){
            $state.go('app.roomba', { dataObj: { room: $scope.room, roomba: $scope.roomba }});
        };

}]);