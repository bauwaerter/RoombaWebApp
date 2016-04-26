/**
 * Created by brandon on 4/23/16.
 */
angular.module("directives", [])
    // author - http://jsfiddle.net/alexsuch/6aG4x/
    .directive('readFile', function ($parse) {
        return {
            restrict: 'A',
            scope: false,
            link: function(scope, element, attrs) {
                var fn = $parse(attrs.readFile);

                element.on('change', function(onChangeEvent) {
                    var reader = new FileReader();

                    reader.onload = function(onLoadEvent) {
                        scope.$apply(function() {
                            fn(scope, {$fileContent:onLoadEvent.target.result});
                        });
                    };

                    reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
                });
            }
        };
    });
    //.directive("grid", function(){
    //    return {
    //        restrict: "A",
    //        scope: {
    //            height: "@height",
    //            width: "@width"
    //        },
    //        link: function(scope, element){
    //
    //            angular.element(document).ready(function () {
    //                var el = element[0];
    //                var context = el.getContext('2d');
    //                context.strokeStyle = "black";
    //
    //                var bw = parseInt(scope.width);
    //                var bh = parseInt(scope.height);
    //                var p = 10;
    //
    //
    //                for (var x = 0; x <= bw; x += 40) {
    //                    context.moveTo(0.5 + x + p, p);
    //                    context.lineTo(0.5 + x + p, bh + p);
    //                    context.stroke();
    //
    //                }
    //
    //
    //                for (var y = 0; y <= bh; y += 40) {
    //                    context.moveTo(p, 0.5 + y + p);
    //                    context.lineTo(bw + p, 0.5 + y + p);
    //                    context.stroke();
    //                }
    //            });
    //
    //        }
    //    };
    //});