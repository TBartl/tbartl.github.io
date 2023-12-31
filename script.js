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

    $scope.projectFilter = -1;
    $scope.setFilter = function (id) {
        $scope.projectFilter = id;
        $scope.selectedProject = -1;
    }

    $scope.cycleHoverChars(1000);

    $scope.selectedProject = -1;

    $scope.selectProject = function (i) {
        if ($scope.selectedProject != i) {
            $scope.selectedProject = i;
        } else {
            $scope.selectedProject = -1;
        }
        smoothScroll("project" + i);
    }

    $scope.scrollTo = function (id) {
        // location.href = "#";
        // location.href = "#project" + id; 
        smoothScroll("project" + id);
        $scope.selectedProject = id;
    }

});

angular.module("app").directive('deferImageLoad', [function () {
    return {
        restrict: 'A',
        scope: {},
        controllerAs: '$ctrl',
        bindToController: {
            imageSrc: '@'
        },
        controller: ['$element', function ($element) {
            this.$onInit = function () {
                if (window.addEventListener) {
                    window.addEventListener("load",
                        this.setImageSrc.bind(this), false);
                }
                else if (window.attachEvent) {
                    window.attachEvent("onload",
                        this.setImageSrc.bind(this));
                }
            };

            this.setImageSrc = function () {
                $element.attr('src', this.imageSrc);
            };
        }]
    };
}]);

var layers = document.getElementsByClassName("layer");

var screenRatio = 1;

function setWindowSize() {
    var myWidth;
    if (typeof (window.innerWidth) == 'number') {
        myWidth = window.innerWidth;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
            }
        }
    }
    screenRatio = myWidth / 1920.0;
    if (document.body) {
        document.body.style.transform = "scale(" + screenRatio + ")";
        setZoom();
    }
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

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function smoothScroll(eID) {
    var from = currentYPosition();
    var toElm = document.getElementById(eID);

    var time = 300;
    var steps = 15;
    for (var i = 0; i < steps; i += 1) {
        amt = (i + 1) / steps;
        setTimeout(function (amt) {
            console.log(amt);
            var to = toElm.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 50;
            window.scrollTo(0, from * (1-amt) + to * amt);
        }, time * amt, Math.pow(amt, .5));
    }
    return;
}