angular.module('app', []);

angular.module('app').controller('MainController', function ($scope, $timeout) {
    $scope.count = 0;

    $scope.hoverChar = -1;
    $scope.onCharMouseOver = function (id) {
        $scope.hoverChar = id;
    }
    $scope.onCharMouseLeave = function () {
        $scope.startAutoHoverAfter(3000);
        $scope.hoverChar = -1;
        console.log('Hey');
    }

    $scope.cycleHoverChars = function (delay) {
        chars = [0, 1, 2, 3, 14, 13, 12, 11, 10, 20, 21, 22, 23, 24];

        onNextChar = function (i, from) {
            if ($scope.hoverChar != from) {
                console.log('huh');

                return;
            }
            $scope.hoverChar = chars[i];
            $timeout(onNextChar, delay, true, (i + 1) % chars.length, chars[i]);
        }
        onNextChar(0, $scope.hoverChar);
    }

    $scope.startAutoHoverAfter = function (delay) {
        var lastCheck = $scope.hoverChar;
        $scope.lastCheck = lastCheck;
        $timeout(function () {
            if (lastCheck == $scope.lastCheck && $scope.hoverChar == -1)
                $scope.cycleHoverChars(1000);
        }, delay);
    }

    $scope.cycleHoverChars(1000);

});

var layers = document.getElementsByClassName("layer");

(function () {
    window.addEventListener('scroll', function (event) {
        var topDistance = this.pageYOffset;
        for (var i = 0, len = layers.length; i < len; i++) {
            var layer = layers[i];
            var depth = layer.getAttribute('data-depth');
            var movement = (topDistance * depth);
            // console.log(movement);
            // layer.style.bottom = movement + "px";

            var translate3d = 'translate3d(0, ' + movement + 'px, 0)';
            // layer.style['-webkit-transform'] = translate3d;
            // layer.style['-moz-transform'] = translate3d;
            // layer.style['-ms-transform'] = translate3d;
            // layer.style['-o-transform'] = translate3d;
            layer.style.transform = translate3d;

        }
    });

}).call(this);
