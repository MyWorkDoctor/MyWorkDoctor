var DEPS = ['$scope', "$location"];
var homeCtrl = function(scope, location) {
    scope.patient = {}
    scope.patient.props = dummyData;
    scope.viewOptions.headerTitle =  "Welcome"
    scope.patientLogin = function(patient){
        location.path("/consentForm");
    }
}

homeCtrl.$inject = DEPS;
myWorkDoc.controller('homeCtrl', homeCtrl);

var dummyData = {
    "firstname" : "Test f",
    "lastname" : "Test l",
    "reasonforvisit" : "Test reasonforvisit",
    "phone" : 1234567891,
    "type" : "newpatient"
}