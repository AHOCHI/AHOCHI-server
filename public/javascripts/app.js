var app = angular.module('Ahochi', ['ngResource', 'ngRoute', 'ngMaterial']);

app.config(function($mdThemingProvider) {
    //same as defaults currently
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('grey');
});