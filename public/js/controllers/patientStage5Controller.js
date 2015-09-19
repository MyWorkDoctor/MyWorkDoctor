var DEPS = ['$scope', '$location'];
var patientStage5Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234"
    scope.previous = function(){
        location.path("/patientStage4");
    }
    scope.next = function(){
        location.path("/patientStage6");           
    }
}

patientStage5Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage5Ctrl', patientStage5Ctrl);