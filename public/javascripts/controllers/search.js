app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/search.html',
            controller: 'SearchCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('SearchCtrl', ['$scope', '$resource', '$routeParams', '$route',
    function($scope, $resource, $routeParams, $route) {

        $scope.loading = false;

        $scope.loadProviders = function(s) {
            $route.updateParams({
                q: s
            });
            $scope.loading = true;
            var Providers = $resource('/api/providers/search/' + s);
            Providers.query(function(providers) {
                $scope.providers = providers;
                $scope.loading = false;
            })
        }

        if ($routeParams.q) {
            $scope.searchString = $routeParams.q;
            $scope.loadProviders($routeParams.q);
        }

    }
]);