app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-provider', {
            templateUrl: 'partials/provider-form.html',
            controller: 'AddProviderCtrl'
        })
        .when('/provider/:id', {
            templateUrl: 'partials/provider-form.html',
            controller: 'EditProviderCtrl'
        })
        .when('/provider/delete/:id', {
            templateUrl: 'partials/provider-delete.html',
            controller: 'DeleteProviderCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource',
    function($scope, $resource) {
        var Providers = $resource('/api/providers');
        Providers.query(function(providers) {
            $scope.providers = providers;
        })
    }
]);

app.controller('AddProviderCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location) {
        $scope.save = function() {
            var Providers = $resource('/api/providers');
            Providers.save($scope.provider, function() {
                $location.path('/');
            });
        };
    }
]);

app.controller('EditProviderCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Providers = $resource('/api/providers/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        Providers.get({
            id: $routeParams.id
        }, function(provider) {
            $scope.provider = provider;
        });

        $scope.save = function() {
            Providers.update($scope.provider, function() {
                $location.path('/');
            });
        }
    }
]);

app.controller('DeleteProviderCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams) {
        var Providers = $resource('/api/providers/:id');

        Providers.get({
            id: $routeParams.id
        }, function(provider) {
            $scope.provider = provider;
        })

        $scope.delete = function() {
            Providers.delete({
                id: $routeParams.id
            }, function(provider) {
                $location.path('/');
            });
        }
    }
]);