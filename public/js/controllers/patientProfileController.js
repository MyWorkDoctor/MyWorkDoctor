var DEPS = ['$scope', "$location", "$http", "patientSvc", "patientProfileModel", "QUICK_BLOX_CONFIG"];
var patientProfileCtrl = function(scope, location, http, patientSvc, patientProfileModel, QUICK_BLOX_CONFIG) {
    scope.patient = {}    
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.reportIncident = function (patient) {
        if(patient.props.type == 'newpatient'){
            patientProfileModel.setNewPatient(true);
        } else if(patient.props.type == 'oldpatient'){
            patientProfileModel.setNewPatient(false);
        }
        delete patient.props.type
        patientProfileModel.setPatientProfData(patient.props);
        patientProfileModel.setHeaderTitle("Consent Form");
        patientProfileModel.setAppSession = true;
        location.path("/consentForm");
    }    
    scope.previous = function(){
        scope.viewOptions.errMsg = ""
        location.path("/")
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
            scope.viewOptions.errMsg = "You must accept the terms and conditions"
        }    
    }
    var patientLogin = function (){      
        var success = function (response){
            var token = response.token;
            var roomId = response.room._id;
            var patientId = patientProfileModel.getPatientProfData().id
            var quickboxLoginId = response.login
            var quickboxPassword = response.password
            var quickboxId = response.room.creator
            patientProfileModel.setPatientId(patientId);            
            patientProfileModel.setAuthKey(token);
            patientProfileModel.setRoomId(roomId);
            patientProfileModel.setQuickboxLoginId(quickboxLoginId);
            patientProfileModel.setQuickboxPassword(quickboxPassword);
            patientProfileModel.setQuickboxId(quickboxId);
            patientProfileModel.setHeaderTitle("Patient ID "+patientId);
            quickbloxLogin();            
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
            var patientId = response.user._id;
            var reason = patientProfileModel.getPatientProfData().reason;            
            var obj = {
              "id": patientId,
              "reason": reason
            }
            patientProfileModel.setPatientProfData(obj);
            patientLogin();
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.createPatientProfile(patientProfileModel.getPatientProfData())
            .then(success, failure)
    }
    
    var quickbloxLogin = function(){
        var obj = {
            id: patientProfileModel.getQuickboxId(),            
            login: patientProfileModel.getQuickboxLoginId(),
            password: patientProfileModel.getQuickboxPassword()
        }
        var success = function (response){
            quickbloxChat();
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.quickboxLogin(obj)
            .then(success, failure)
    }

    var quickbloxChat = function(){
        var obj = {
            id: patientProfileModel.getQuickboxId(),            
            appId: QUICK_BLOX_CONFIG.appId,
            password: patientProfileModel.getQuickboxPassword()
        }
        var success = function (response){
            waitingDialog.hide();
            location.path("/patientStage1")
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.quickboxChat(obj)
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
    "id" : "5576391" // 5294491-Sandeep 5576391-Hemanth 5249411-srinivas
}