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

        $scope.providers = [];

        $scope.searched = false;

        $scope.loadProviders = function(s) {
            var Providers = $resource('/api/providers/search/' + s);
            Providers.query(function(providers) {
                $scope.providers = providers;
                $scope.searched = true;
            })
        }
    }
]);