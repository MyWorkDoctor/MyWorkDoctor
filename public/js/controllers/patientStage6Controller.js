var DEPS = ['$scope', '$location'];
var patientStage6Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234"
}

patientStage6Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage6Ctrl', patientStage6Ctrl);