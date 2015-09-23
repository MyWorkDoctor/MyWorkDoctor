DEPS = ["$rootScope"]

var service = function(rootScope) {
    this.patientProfData = null;
    this.headerTitle = "Welcome";
    this.newPatient = null;
    this.username = null;
    this.injuredParts = null
    this.injuryNature = null
    this.painLevel = null
    this.authKey = null
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
    this.setUsername = function (username){
        this.username = username; 
    }   
    this.getUsername = function (){
        return this.username;
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
}

DEPS.push(service)
myWorkDoc.service("patientProfileModel", DEPS)