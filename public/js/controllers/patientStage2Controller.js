var DEPS = ['$scope', '$location'];
var patientStage2Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234"
    scope.previous = function(){
        location.path("/patientStage1");
    }
    scope.next = function(){
        location.path("/patientStage3");           
    }
}

patientStage2Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage2Ctrl', patientStage2Ctrl);