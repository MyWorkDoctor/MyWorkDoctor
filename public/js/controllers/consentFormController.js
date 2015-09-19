var DEPS = ['$scope', '$location'];
var consentFormCtrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Consent Form"
    scope.previous = function(){
        location.path("/home")
    }
    scope.next = function(){
        location.path("/patientStage1")
    }
}

consentFormCtrl.$inject = DEPS;
myWorkDoc.controller('consentFormCtrl', consentFormCtrl);