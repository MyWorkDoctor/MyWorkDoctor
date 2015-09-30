DEPS = ["$rootScope"]

var service = function(rootScope) {
    this.patientProfData = null;
    this.headerTitle = "Welcome";
    this.newPatient = null;
    this.injuredParts = null
    this.injuryNature = null
    this.painLevel = null
    this.authKey = null
    this.roomId = null
    this.patientId = null
    this.uploadImageCount = 0
    this.appSession = false
    this.quickboxLoginId = null
    this.quickboxPassword = null
    this.quickboxId = null
    this.setHeaderTitle = function (headerTitle){
        this.headerTitle = headerTitle
    }
    this.getHeaderTitle = function (){
        return this.headerTitle
    }
    this.setPatientProfData = function(patientProfData) {
        this.patientProfData = patientProfData;
    }
    this.getPatientProfData = function() {
        return this.patientProfData;
    }
    this.setNewPatient = function (newPatient){
        this.newPatient = newPatient
    }
    this.isNewPatient = function (){
        return this.newPatient
    }
    this.setInjuredParts = function (injuredParts){
        this.injuredParts = injuredParts
    }
    this.getInjuredParts = function () {
        return this.injuredParts;
    }
    this.setInjuryNature = function(injuryNature) {
        this.injuryNature = injuryNature;
        angular.forEach(injuryNature.options, function(value, key){
            angular.forEach(injuryNature.listedInjuryNature, function(obj){
                if(key === obj.value){                    
                    if(value.left){
                        obj.value += "-left";
                    }
                    if(value.right){
                        obj.value += "-right";
                    }                        
                }
            });
        })
    }
    this.getInjuryNature = function() {
        return this.injuryNature;
    }
    this.setPainLevel = function(painLevel) {
        this.painLevel = painLevel;
    }
    this.getPainLevel = function() {
        return this.painLevel;
    }
    this.setAuthKey = function(authKey) {
        this.authKey = authKey;
    }
    this.getAuthKey = function(){
        return this.authKey;
    }
    this.setRoomId = function(roomId) {
        this.roomId = roomId;
    }
    this.getRoomId = function(){
        return this.roomId;
    }
    this.setPatientId = function(patientId) {
        this.patientId = patientId;
    }
    this.getPatientId = function(){
        return this.patientId;
    }
    this.incrementUploadImageCount = function(){
        this.uploadImageCount++;
    }
    this.decrementUploadImageCount = function(){
        this.uploadImageCount++;
    }
    this.getUploadImageCount = function(){
        return this.uploadImageCount;
    }
    this.setAppSession = function(appSession){
        this.appSession = appSession
    }
    this.isAppSession = function(){
        return this.appSession
    }
    this.setQuickboxLoginId = function(quickboxLoginId){
        this.quickboxLoginId = quickboxLoginId;
    }
    this.getQuickboxLoginId = function(){
        return this.quickboxLoginId;
    }
    this.setQuickboxPassword = function(quickboxPassword){
        this.quickboxPassword = quickboxPassword;
    }
    this.getQuickboxPassword = function(){
        return this.quickboxPassword;
    }
    this.setQuickboxId = function(quickboxId){
        this.quickboxId = quickboxId;
    }
    this.getQuickboxId = function(){
        return this.quickboxId;
    }
}

DEPS.push(service)
myWorkDoc.service("patientProfileModel", DEPS)