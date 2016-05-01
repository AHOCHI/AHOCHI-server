app.directive('ahProvider', function() {
    return {
        restrict: 'E',
        scope: {
            provider: '=',
        },
        templateUrl: '/partials/singleProvider.html',
        controller: ['$scope', function($scope) {
            $scope.cleanUrl = function(url) {
                return url.replace(/\*$/g, '');
            }
        }]
    };
});