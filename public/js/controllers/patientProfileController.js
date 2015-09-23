var DEPS = ['$scope', "$location", "$http", "patientSvc", "patientProfileModel"];
var patientProfileCtrl = function(scope, location, http, patientSvc, patientProfileModel) {
    scope.patient = {}
    scope.patient.props = dummyData;
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.reportIncident = function (patient) {
        if(patient.props.type == 'newpatient'){
            patientProfileModel.setNewPatient(true);
        } else if(patient.props.type == 'oldpatient'){
            patientProfileModel.setNewPatient(false);
        }
        patientProfileModel.setPatientProfData(patient.props);
        patientProfileModel.setHeaderTitle("Consent Form");
        location.path("/consentForm");
    }    
    scope.previous = function(){
        scope.viewOptions.errMsg = ""
        location.path("/home")
    }
    scope.next = function(){        
        if(scope.accept){            
            if(patientProfileModel.isNewPatient()){
                waitingDialog.show('Creating Patient Profile');
                createPatient();
            } else {
                waitingDialog.show('Logging in');
                patientLogin();
            }
        }else {
            location.path("/patientStage1")
            // scope.viewOptions.errMsg = "You must accept the terms and conditions"
        }    
    }
    var patientLogin = function (){        
        var success = function (response){
            waitingDialog.hide();
            location.path("/patientStage1")
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.patientLogin(patientProfileModel.getPatientProfData())
            .then(success, failure)
    }
    var createPatient = function (){
        var success = function (response){
            var username = response.user.login;
            var password = response.user.password;
            patientProfileModel.setUsername(username);
            patientLogin(username, password);
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.createPatientProfile(patientProfileModel.getPatientProfData())
            .then(success, failure)
    }
    scope.onAccept = function (accept) {
        if(accept){
            scope.viewOptions.errMsg = "";
        }
    }
}

patientProfileCtrl.$inject = DEPS;
myWorkDoc.controller('patientProfileCtrl', patientProfileCtrl);

var dummyData = {
    "firstname" : "Hemanth",
    "lastname" : "Gundrajukuppam",
    "reason" : "visiting",
    "phone" : 9177346796,
    "type" : "newpatient",
    "email" : "hemanth3697@gmail.com",
    "id" : "sandeep1"
}