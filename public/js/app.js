var myWorkDoc = angular.module('MyWorkDoc', [
    'ngRoute',
    'angularFileUpload',
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
        controller: 'imageUploadingController'
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
        controller: 'videoCallReceivingCtrl'
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
myWorkDoc.constant("QUICK_BLOX_CONFIG", {
  appId: 27840,
  authKey: 'q5tEFx9BOa2G2Lg',
  authSecret: 'OuR85fgtxZ6eDn7',
  options : {
      chatProtocol: {
        active: 2,
      },
      debug: true,
      webrtc: {
        answerTimeInterval: 60,
        dialingTimeInterval: 5
      }
    }
});