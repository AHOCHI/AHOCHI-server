var app = angular.module('Ahochi', ['ngResource', 'ngRoute', 'ngMaterial']);

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

app.controller('SearchCtrl', ['$scope', '$resource',
    function($scope, $resource) {

        $scope.loading = false;

        $scope.loadProviders = function(s) {
            $scope.loading = true;
            var Providers = $resource('/api/providers/search/' + s);
            Providers.query(function(providers) {
                $scope.providers = providers;
                $scope.loading = false;
            })
        }

    }
]);