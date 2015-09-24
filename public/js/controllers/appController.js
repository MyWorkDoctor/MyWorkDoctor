var DEPS = ['$scope', 'patientProfileModel', '$location'];
var appCtrl = function(scope, patientProfileModel, location) {
    scope.viewOptions = {}
    if(patientProfileModel.isAppSession){
        location.path("/");
    }
}

appCtrl.$inject = DEPS;
myWorkDoc.controller('appCtrl', appCtrl);