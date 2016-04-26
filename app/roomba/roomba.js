'use strict';

angular.module('myApp.roomba', [])

    .controller('RoombaCtrl', ['$scope', '$state', 'MachineService', function($scope, $state, MachineService) {

        $scope.machineService = $state.params.machineService;

        if($scope.machineService != null)
            $scope.machineService.initializeSteps();
        else
            $scope.machineService = new MachineService();

        $scope.playAll = function(){
            $scope.machineService.play();
        };

        $scope.nextStep = function(){
            $scope.machineService.step();
        };

        //TODO: fix grid
        //var drawGrid = function(){
        //
        //    var el = angular.element('#canvas')[0];
        //    var context = el.getContext('2d');
        //
        //    var bw = $scope.room.coordinates.x;
        //    var bh = $scope.room.coordinates.y;
        //    var p = 10;
        //
        //    for (var x = 0; x <= bw; x += 40) {
        //        context.moveTo(0.5 + x + p, p);
        //        context.lineTo(0.5 + x + p, bh + p);
        //    }
        //
        //
        //    for (var y = 0; y <= bh; y += 40) {
        //        context.moveTo(p, 0.5 + y + p);
        //        context.lineTo(bw + p, 0.5 + y + p);
        //    }
        //
        //    context.strokeStyle = "black";
        //    context.stroke();
        //};

    }]);