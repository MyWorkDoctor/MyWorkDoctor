var DEPS = ['$scope', '$location'];
var patientStage7Ctrl = function(scope, location) {
    scope.viewOptions.headerTitle =  "Patient ID #1234"
}

patientStage7Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage7Ctrl', patientStage7Ctrl);