var DEPS = ['$scope', '$location'];
var patientStage1Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234"
    scope.previous = function(){
        location.path("/consentForm");
    }
    scope.next = function(){
        location.path("/patientStage2");           
    }
}

patientStage1Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage1Ctrl', patientStage1Ctrl);