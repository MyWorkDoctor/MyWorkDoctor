var DEPS = ['$scope', '$location'];
var patientStage3Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234"
    scope.previous = function(){
        location.path("/patientStage2");
    }
    scope.next = function(){
        location.path("/patientStage4");           
    }
}

patientStage3Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage3Ctrl', patientStage3Ctrl);