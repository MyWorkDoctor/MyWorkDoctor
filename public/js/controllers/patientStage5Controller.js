var DEPS = ['$scope', '$location', 'patientProfileModel'];
var patientStage5Ctrl = function(scope, location, patientProfileModel) {
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.previous = function(){
        location.path("/patientStage4");
    }
    scope.next = function(){
        location.path("/patientStage6");           
    }
}

patientStage5Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage5Ctrl', patientStage5Ctrl);