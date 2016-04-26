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
            }
        };

        return MachineService;

    });