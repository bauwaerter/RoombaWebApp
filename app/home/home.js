'use strict';

angular.module('myApp.home', [])

.controller('HomeCtrl', ['$scope', '$state', function($scope, $state) {

        $scope.roomba = {
            initCoords: { x: null, y: null },
            drivingInstructions: [""]
        };

        $scope.room = {
            coordinates: { x: null, y: null },
            dirtLocations: [{ x: null, y: null }]
        };

        $scope.addDirtLocation = function(){
            $scope.room.dirtLocations.push({ x: null, y: null });
        };
        $scope.deleteDirtLocation = function(index){
            $scope.room.dirtLocations.splice(index, 1);
        };

        $scope.addDirection = function(){
            $scope.roomba.drivingInstructions.push("");
        };

        $scope.deleteDrivingInstruction = function(index){
            $scope.roomba.drivingInstructions.splice(index, 1);
        };

        $scope.goRoombaGo = function(){
            $state.go('app.roomba', { dataObj: { room: $scope.room, roomba: $scope.roomba }});

        };

}]);