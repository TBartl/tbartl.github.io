angular.module('app', []);

angular.module('app').controller('MainController', function ($scope, $timeout) {
    $scope.count = 0;

    $scope.hoverChar = -1;
    $scope.onCharMouseOver = function(id) {
        $scope.hoverChar = id;
    }
    $scope.onCharMouseLeave = function() {
        $scope.startAutoHoverAfter(3000);
        $scope.hoverChar = -1;
        console.log('Hey');
    }

    $scope.cycleHoverChars = function(delay) {
        chars = [0, 1, 2, 3, 14, 13, 12, 11, 10, 20, 21, 22, 23, 24];
        
        onNextChar = function(i, from) {
            if ($scope.hoverChar != from) {
                console.log('huh');
                
                return;
            }
            $scope.hoverChar = chars[i];
            $timeout(onNextChar, delay, true, (i+1)%chars.length, chars[i]);
        }
        onNextChar(0, $scope.hoverChar);
    }

    $scope.startAutoHoverAfter = function(delay) {
        var lastCheck = $scope.hoverChar;
        $scope.lastCheck = lastCheck;
        $timeout(function() {            
            if (lastCheck == $scope.lastCheck && $scope.hoverChar == -1)
                $scope.cycleHoverChars(1000);
        }, delay);
    }

    $scope.cycleHoverChars(1000);

});