app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/add.html',
            controller: 'AddProviderCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('AddProviderCtrl', ['$scope', '$resource', '$window',
    function($scope, $resource, $window) {
        $scope.provider = {};
        $scope.provider.services = [];
        $scope.provider.counties = [];

        $scope.save = function() {
            var Providers = $resource('/api/providers');
            Providers.save($scope.provider, function() {
                $window.location.href = '/';
            });
        };
    }
]);