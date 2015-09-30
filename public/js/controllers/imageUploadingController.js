var DEPS = ['$scope', 'patientSvc', '$location', 'fileReader', 'patientProfileModel', '$base64', "$timeout", 'ERR_TIME_OUT'];
var patientStage1Ctrl = function(scope, patientSvc, location, fileReader, patientProfileModel, base64, $timeout, ERR_TIME_OUT) {    
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.imageSrc = '../images/injured-person.png';
    scope.imageUploadSuccess = false;
    scope.viewOptions.imageButtonUrl = "./images/skip-btn.png";
    scope.service = patientProfileModel;
    scope.onImageUpload = function($files){
        var success = function (response){
            waitingDialog.hide();            
            scope.imageUploadSuccess = true;
            $timeout(function(){
                scope.imageUploadSuccess = false;
            }, ERR_TIME_OUT)           
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            patientProfileModel.decrementUploadImageCount();
            scope.viewOptions.errMsg = errMsg;
        }      
        waitingDialog.show('Uploading...');
        scope.image = $files[0];     
        fileReader.readAsDataUrl(scope.image, scope)
            .then(function(result) {
                scope.imageSrc = result;
                scope.imagesCount = patientProfileModel.incrementUploadImageCount();
                var obj = {
                  "roomid":patientProfileModel.getRoomId(),
                  "imagedata": scope.imageSrc,
                  "imageno": patientProfileModel.getUploadImageCount()
                }
                patientSvc.uploadImage(obj)
                    .then(success, failure)
            });
    }    
    scope.next = function(){        
        location.path("/patientStage2");        
    }
    scope.imageUpload = function(){
        if(patientProfileModel.getUploadImageCount() > 4){
            scope.viewOptions.errMsg = "You can upload maximum of 4 photos";
            return;
        }
        $('#patientImage').click()
    }
    scope.$watch('service.getUploadImageCount()', function(newVal){
        if(newVal > 0){
            scope.viewOptions.imageButtonUrl = "./images/next-btn.png";
        }else {
            scope.viewOptions.imageButtonUrl = "./images/skip-btn.png";
        }        
    })
}

patientStage1Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage1Ctrl', patientStage1Ctrl);