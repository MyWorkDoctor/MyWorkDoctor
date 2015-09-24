var myWorkDoc = angular.module('MyWorkDoc', [
    'ngRoute',
    'angularFileUpload',    
    'webcam',
    'base64'
]);
var DEPS = ['$routeProvider', "$locationProvider"]
var routeConfig = function (routeProvider, locationProvider){        
    routeProvider
    .when('/', {
        templateUrl: 'partials/home',
        controller: 'patientProfileCtrl'
    })
    .when('/consentForm', {
        templateUrl: 'partials/consentForm',
        controller: 'patientProfileCtrl'
    })
    .when('/patientStage1', {
        templateUrl: 'partials/patientStage1',
        controller: 'patientStage1Ctrl'
    })
    .when('/patientStage2', {
        templateUrl: 'partials/patientStage2',
        controller: 'patientQueryCtrl'
    })
    .when('/patientStage3', {
        templateUrl: 'partials/patientStage3',
        controller: 'patientQueryCtrl'
    })
    .when('/patientStage4', {
        templateUrl: 'partials/patientStage4',
        controller: 'patientQueryCtrl'
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
        redirectTo: "/"
    });

    locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}

routeConfig.$inject = DEPS;
myWorkDoc.config(routeConfig);
myWorkDoc.constant("ERR_TIME_OUT", 4000)