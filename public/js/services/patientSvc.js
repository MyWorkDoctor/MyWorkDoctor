DEPS = ["$q", "$http", "$log", "$upload", "patientProfileModel"]

var factory = function($q, $http, log, $upload, patientProfileModel) {
    var Patient = {        
        baseUrl : function (){
            return "/";// http://49.238.48.45:3000/
        },
        patientLoginUrl : function (){
            return this.baseUrl() + "login";
        },
        createPatientProfUrl : function (){
            return this.baseUrl() + "createUser";
        },
        addQuestionsUrl : function(){
            return this.baseUrl() + "addQuestions";
        },
        uploadImageUrl : function(){
            return this.baseUrl() + "uploadImage";
        },
        patientLogin : function (props) {
            var q = $q.defer();
            var success = function (svrResult) { 
                if(svrResult.error){
                    error(svrResult.errordetails.error)
                }else {
                    return q.resolve(svrResult.response)
                }                               
            }
            var error = function (errMsg) {
                return q.reject(errMsg)
            }
            $http.post(this.patientLoginUrl(), props)
                .success(success)
                .error(error)
            return q.promise
        },
        createPatientProfile : function (props){
            var q = $q.defer();
            var success = function (svrResult) {
                if(svrResult.error){
                    error(svrResult.errordetails.error)
                }else {
                    return q.resolve(svrResult.response)
                }
                
            }
            var error = function (errMsg) {
                return q.reject(errMsg)
            }
            $http.post(this.createPatientProfUrl(), props)
                .success(success)
                .error(error)
            return q.promise
        },
        addQuestions : function (props){
            var q = $q.defer();
            var success = function (svrResult) {
                if(svrResult.error){
                    error(svrResult.errordetails.error)
                }else {
                    return q.resolve(svrResult.response)
                }
                
            }
            var error = function (errMsg) {
                return q.reject(errMsg)
            }
            $http.post(this.addQuestionsUrl(), props, { 
                headers: {'Auth': patientProfileModel.getAuthKey()}})
                .success(success)
                .error(error)
            return q.promise
        },
        uploadImage : function(props){
            var q = $q.defer();
            var success = function (svrResult) {
                if(svrResult.error){
                    error(svrResult.errordetails.error)
                }else {
                    return q.resolve(svrResult.response)
                }
                
            }
            var error = function (errMsg) {
                return q.reject(errMsg)
            }            
            $http.post(this.uploadImageUrl(), props, { 
                headers: {'Auth': patientProfileModel.getAuthKey()}})
                .success(success)
                .error(error)         
            return q.promise
        },
        quickboxLogin : function(props){
            var q = $q.defer();
            var success = function (svrResult) {
                if(svrResult.error){
                    error(svrResult.errordetails.error)
                }else {
                    return q.resolve(svrResult.response)
                }
                
            }
            var error = function (errMsg) {
                return q.reject(errMsg)
            }
            QB.createSession(props, function(err, res) {
                if (res) {
                  success(res);
                } else {
                    error(err)
                }
              });      
            return q.promise
        }
        ,
        quickboxChat : function(props){
            var q = $q.defer();
            var success = function (svrResult) {
                if(svrResult.error){
                    error(svrResult.errordetails.error)
                }else {
                    return q.resolve(svrResult.response)
                }
                
            }
            var error = function (errMsg) {
                return q.reject(errMsg)
            }
            QB.chat.connect({
                jid: QB.chat.helpers.getUserJid(props.id, props.appId),
                password: props.password
              }, function(err, res) {
                 if (res) {
                  success(res);
                } else {
                    error(err)
                }
              })      
            return q.promise
        }
    }
    return Patient;
}

DEPS.push(factory)
myWorkDoc.factory("patientSvc", DEPS)