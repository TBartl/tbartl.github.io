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
    }

    $scope.cycleHoverChars = function (delay) {
        chars = [0, 1, 2, 3, 14, 13, 12, 11, 10, 20, 21, 22, 23, 24];

        onNextChar = function (i, from) {
            if ($scope.hoverChar != from) {
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

var screenRatio = 1;

function setWindowSize() {
    var myWidth;
    // var myHeight;
    if (typeof (window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
        // myHeight = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
            // myHeight = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
                // myHeight = document.body.clientHeight;
            }
        }
    }
    screenRatio = myWidth / 1920.0;
    document.body.style.transform = "scale(" + screenRatio + ")";
    setZoom();
}

function setZoom() {
    var topDistance = this.pageYOffset;
    for (var i = 0, len = layers.length; i < len; i++) {
        var layer = layers[i];
        var depth = layer.getAttribute('data-depth');
        var movement = (topDistance * depth / screenRatio);
        // console.log(movement);
        // layer.style.bottom = movement + "px";

        var translate3d = 'translate3d(0, ' + movement + 'px, 0)';
        // layer.style['-webkit-transform'] = translate3d;
        // layer.style['-moz-transform'] = translate3d;
        // layer.style['-ms-transform'] = translate3d;
        // layer.style['-o-transform'] = translate3d;
        layer.style.transform = translate3d;

    }
}

function setLoad() {
    setWindowSize();
}

window.addEventListener('resize', setWindowSize);
window.addEventListener('scroll', setZoom);

window.addEventListener("load", setLoad);