DEPS = ["$q", "$http", "$log", "$upload"]

var factory = function($q, $http, log, $upload) {
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
            $http.post(this.addQuestionsUrl(), props)
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
            $upload.upload({
                url: this.uploadImageUrl(),
                data: props
              })
              .success(success)
              .error(error)            
            return q.promise
        }
    }

    return Patient;
}

DEPS.push(factory)
myWorkDoc.factory("patientSvc", DEPS)