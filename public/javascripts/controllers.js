app.controller('SideNavCtrl', ['$scope', '$mdSidenav', '$mdMedia',
    function($scope, $mdSidenav, $mdMedia) {
        $scope.$mdMedia = $mdMedia;
        $scope.toggleNav = function(id) {
            $mdSidenav(id).toggle();
        }
    }
]);