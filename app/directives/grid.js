/**
 * Created by brandon on 4/23/16.
 */
angular.module("grid_directive", [])
    .directive("grid", function(){
        return {
            restrict: "A",
            scope: {
                height: "@height",
                width: "@width"
            },
            link: function(scope, element){

                angular.element(document).ready(function () {
                    var el = element[0];
                    var context = el.getContext('2d');
                    context.strokeStyle = "black";

                    var bw = parseInt(scope.width);
                    var bh = parseInt(scope.height);
                    var p = 10;


                    for (var x = 0; x <= bw; x += 40) {
                        context.moveTo(0.5 + x + p, p);
                        context.lineTo(0.5 + x + p, bh + p);
                        context.stroke();

                    }


                    for (var y = 0; y <= bh; y += 40) {
                        context.moveTo(p, 0.5 + y + p);
                        context.lineTo(bw + p, 0.5 + y + p);
                        context.stroke();
                    }
                });




            }
        };
    });