var DEPS = ['$scope', '$location'];
var patientStage4Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234";        
    scope.previous = function(){
        location.path("/patientStage3");
    }
    scope.next = function(){
        location.path("/patientStage5");           
    }
    scope.ratePainLevel = function(painLevel){
        scope.progressValue = painLevel
    }
}

patientStage4Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage4Ctrl', patientStage4Ctrl);