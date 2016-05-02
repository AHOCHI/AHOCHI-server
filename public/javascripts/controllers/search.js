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

app.controller('SearchCtrl', ['$scope', '$routeParams', '$route', '$http',
    function($scope, $routeParams, $route, $http) {

        $scope.loading = false;

        $scope.loadProviders = function(s) {

            if (s) {
                $route.updateParams({
                    q: s
                });
            }

            var query = angular.copy($scope.selected);
            for (var i in query) {
                if (!query[i] || query[i] === '*') {
                    delete query[i];
                }
            }

            $scope.loading = true;

            $http.post('/api/providers/search/' + (s ? s : ''), query).then(function(response) {
                $scope.providers = response.data;
                $scope.loading = false;
            });
        }

        if ($routeParams.q) {
            $scope.searchString = $routeParams.q;
            $scope.loadProviders($routeParams.q);
        }

        $scope.selected = {};
        $scope.options = {};

        $scope.getOptions = function(opt) {
            var optToEndpoint = {
                city: 'cities',
                state: 'states',
                zip: 'zips',
                service: 'services',
                county: 'counties'
            }
            if (optToEndpoint[opt]) {
                var query = angular.copy($scope.selected);
                delete query[opt];

                for (var i in query) {
                    if (!query[i] || query[i] === '*') {
                        delete query[i];
                    }
                }

                return $http.post('/api/' + optToEndpoint[opt], query).then(function(response) {
                    $scope.options[opt] = ['*'].concat(response.data.sort());
                });
            }
            else {
                console.error('Unknown option ' + opt);
            }
        }
    }
]);