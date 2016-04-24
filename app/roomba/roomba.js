'use strict';

angular.module('myApp.roomba', [])

    .controller('RoombaCtrl', ['$scope', '$state', function($scope, $state) {

        //if($state.params.dataObj) {
        //    $scope.room = $state.params.dataObj.room;
        //    $scope.roomba = $state.params.dataObj.roomba;
        //}

        $scope.roomba = {
            initCoords: { x: 1, y: 2 },
            drivingInstructions: ['N', 'N', 'E', 'S','E', 'E', 'S', 'W', 'N', 'W', 'W']
        };

        $scope.room = {
            coordinates: { x: 5, y: 5 },
            dirtLocations: [
                { x: 1, y: 0 },
                { x: 2, y: 2 },
                { x: 2, y: 3 }
            ]
        };

        var initializeSteps = function(){
            $scope.steps = [{
                currentLocation: {
                    x: $scope.roomba.initCoords.x,
                    y: $scope.roomba.initCoords.y
                },
                action: "",
                dirtCollected: 0
            }];
        };

        initializeSteps();

        var wallDetection = function(currentLocation){

        };

        var dirtDetection = function(currentLocation){
            var dirtFound = 0;
            angular.forEach($scope.room.dirtLocations, function(dirtLocation, key){
                if(dirtLocation.x == currentLocation.x && dirtLocation.y == currentLocation.y){
                    //dirt found clean it up
                    var index = $scope.room.dirtLocations.indexOf(dirtLocation);
                    $scope.room.dirtLocations.splice(index, 1);
                    dirtFound++;
                }
            });

            return dirtFound;
        };

        var moveRoomba = function(x, y, action){
            var lastStep = $scope.steps[$scope.steps.length-1];

            var currentLocation = {
                x: lastStep.currentLocation.x + x,
                y: lastStep.currentLocation.y + y
            };

            wallDetection(currentLocation);
            var dirtFound = dirtDetection(currentLocation);

            var currentStep = {
                currentLocation: currentLocation,
                action: action,
                dirtCollected: lastStep.dirtCollected + dirtFound
            };

            $scope.steps.push(currentStep);
        };

        $scope.nextStep = function(){
            var drivingInstruction = $scope.roomba.drivingInstructions.shift();

            switch (drivingInstruction){
                case 'N':
                    moveRoomba(0, 1, 'N');
                    break;
                case 'S':
                    moveRoomba(0, -1, 'S');
                    break;
                case 'W':
                    moveRoomba(-1, 0, 'W');
                    break;
                case 'E':
                    moveRoomba(1, 0, 'E');
                    break;
            }
        };


        var drawGrid = function(){

            var el = angular.element('#canvas')[0];
            var context = el.getContext('2d');

            var bw = $scope.room.coordinates.x;
            var bh = $scope.room.coordinates.y;
            var p = 10;

            for (var x = 0; x <= bw; x += 40) {
                context.moveTo(0.5 + x + p, p);
                context.lineTo(0.5 + x + p, bh + p);
            }


            for (var y = 0; y <= bh; y += 40) {
                context.moveTo(p, 0.5 + y + p);
                context.lineTo(bw + p, 0.5 + y + p);
            }

            context.strokeStyle = "black";
            context.stroke();
        };




    }]);