var myWorkDoc = angular.module('MyWorkDoc', [
    'ngRoute'
]);
var DEPS = ['$routeProvider', "$locationProvider"]
var routeConfig = function (routeProvider, locationProvider){        
    routeProvider
    .when('/home', {
        templateUrl: 'partials/home',
        controller: 'homeCtrl'
    })
    .when('/consentForm', {
        templateUrl: 'partials/consentForm',
        controller: 'consentFormCtrl'
    })
    .when('/patientStage1', {
        templateUrl: 'partials/patientStage1',
        controller: 'patientStage1Ctrl'
    })
    .when('/patientStage2', {
        templateUrl: 'partials/patientStage2',
        controller: 'patientStage2Ctrl'
    })
    .when('/patientStage3', {
        templateUrl: 'partials/patientStage3',
        controller: 'patientStage3Ctrl'
    })
    .when('/patientStage4', {
        templateUrl: 'partials/patientStage4',
        controller: 'patientStage4Ctrl'
    })
    .when('/patientStage5', {
        templateUrl: 'partials/patientStage5',
        controller: 'patientStage5Ctrl'
    })
    .when('/patientStage6', {
        templateUrl: 'partials/patientStage6',
        controller: 'patientStage6Ctrl'
    })
    .when('/patientStage7', {
        templateUrl: 'partials/patientStage7',
        controller: 'patientStage7Ctrl'
    })
    .otherwise({
        redirectTo: "/home"
    });

    locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}

routeConfig.$inject = DEPS;
myWorkDoc.config(routeConfig);