/**
 * Created by brandon on 4/25/16.
 */
'use strict';

angular.module('services', [])
    .factory('Coordinate', function(){
       var Coordinate = function(x, y){
           if( (x == null && y == null) ||
               (this.isInt(x) && this.isInt(y))) {
                   this.x = x;
                   this.y = y;
           } else if(angular.isString(x) && angular.isString(y)){
               this.initWithString(x , y);
           }
       };

        Coordinate.prototype = {
           initWithString: function(x, y){
               if(this.isValidCoordinate(x, y)) {
                   this.x = parseInt(x);
                   this.y = parseInt(y);
               } else {
                   this.x = null;
                   this.y = null;
               }
           },
            isValidCoordinate: function(x, y){
                return this.isValid(x) && this.isValid(y);
            },
            isValid: function(coord){
                return this.isInt(parseInt(coord));
            },
            isInt: function(n){
                return angular.isNumber(n) && n % 1 === 0;
            },
            isEqual: function(coord1, coord2){
                return coord1.x == coord2.x && coord1.y == coord2.y;
            }
        };

        return Coordinate;
    })
    .factory('MachineService', function(Coordinate) {

        var MachineService = function(){
            this.roomDimensions = new Coordinate(null, null);
            this.initPosition = new Coordinate(null, null);
            this.dirtLocations = [];
            this.drivingInstructions = [];
            this.steps = [];
            this.complete = false;
            this.wallsHit = 0;
        };

        MachineService.prototype = {
            initWithFile: function(fileContent){
                var self = this;

                var params = fileContent.trim().split('\n');
                var coords = params.shift().trim().split(" ");
                self.roomDimensions = new Coordinate(coords[0], coords[1]);
                coords = params.shift().trim().split(" ");
                self.initPosition = new Coordinate(coords[0], coords[1]);

                angular.forEach(params, function(param, key){
                    var coords = param.trim().split(" ");

                    if(coords.length == 2 && Coordinate.prototype.isValidCoordinate(coords[0], coords[1])){
                        self.dirtLocations.push(new Coordinate(parseInt(coords[0]), parseInt(coords[1])));
                    } else {
                        self.drivingInstructions = coords[0].split('');
                    }
                });
            },
            addDirtLocation: function () {
                this.dirtLocations.push(new Coordinate(null, null));
            },
            deleteDirtLocation: function(index){
                this.dirtLocations.splice(index, 1);
            },
            addDrivingInstruction: function(){
                this.drivingInstructions.push("");
            },
            deleteDrivingInstruction: function(index){
                this.drivingInstructions.splice(index, 1);
            },
            initializeSteps: function(){
                var step = {
                    currentLocation: this.initPosition,
                    action: "",
                    dirtCollected: 0,
                    wallHit: false
                };
                this.steps.push(step);
            },
            dirtDetection: function(currentLocation){
                var dirtFound = 0;
                var self = this;
                angular.forEach(self.dirtLocations, function(dirtLocation, index){
                    if(Coordinate.prototype.isEqual(dirtLocation, currentLocation)){
                        //dirt found clean it up
                        self.dirtLocations.splice(index, 1);
                        dirtFound++;
                    }
                });

                return dirtFound;
            },
            wallDetection: function(currentLocation){
                return currentLocation.x > this.roomDimensions.x ||
                       currentLocation.x < 0 ||
                       currentLocation.y > this.roomDimensions.y ||
                       currentLocation.y < 0;
            },
            perform: function(x, y, action){
                var lastStep = this.steps[this.steps.length-1];

                var currentLocation = new Coordinate(lastStep.currentLocation.x + x,
                                                        lastStep.currentLocation.y + y);

                var wallHit = this.wallDetection(currentLocation);

                if(wallHit){
                    this.wallsHit++;
                    lastStep.wallHit = true;
                    lastStep.action = "";
                    this.steps.push(lastStep);
                } else {
                    var dirtFound = this.dirtDetection(currentLocation);

                    var currentStep = {
                        currentLocation: currentLocation,
                        action: action,
                        dirtCollected: lastStep.dirtCollected + dirtFound,
                        wallHit: wallHit
                    };

                    this.steps.push(currentStep);
                }
            },
            step: function(){
                var drivingInstruction = this.drivingInstructions.shift();

                switch (drivingInstruction){
                    case 'N':
                        this.perform(0, 1, 'N');
                        break;
                    case 'S':
                        this.perform(0, -1, 'S');
                        break;
                    case 'W':
                        this.perform(-1, 0, 'W');
                        break;
                    case 'E':
                        this.perform(1, 0, 'E');
                        break;
                }

                if(this.drivingInstructions.length == 0)
                    this.complete = true;
            },
            play: function(){
                var instructions = this.drivingInstructions.length;
                for(var i = 0; i < instructions; i++){
                    this.step();
                }
            }
        };

        return MachineService;

    });