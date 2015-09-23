var DEPS = ['$scope', 'patientSvc', '$location', 'ngToast', 'fileReader', 'patientProfileModel'];
var patientStage1Ctrl = function(scope, patientSvc, location, ngToast, fileReader, patientProfileModel) {    
    patientProfileModel.setHeaderTitle("Patient ID #1234")    
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.imageSrc = '../images/injured-person.png';
    scope.onImageUpload = function($files){        
        waitingDialog.show('Uploading...');
        scope.image = $files[0];     
        fileReader.readAsDataUrl(scope.image, scope)
            .then(function(result) {
                scope.imageSrc = result;
            });
        var obj = {
          "roomid":"55face502e6564a003329f35",
          "imagedata": scope.image
        }
        var success = function (response){
            waitingDialog.hide();
            // ngToast.create({
            //     'horizontalPosition*':'left',
            //     'verticalPosition*':'top',
            //     'content':'Image Uploaded Successfully'
            // });
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.uploadImage(obj)
            .then(success, failure)        
    }
    scope.previous = function(){
        location.path("/consentForm");
    }
    scope.next = function(){        
        location.path("/patientStage2");        
    }
}

patientStage1Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage1Ctrl', patientStage1Ctrl);