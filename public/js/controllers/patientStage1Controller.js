var DEPS = ['$scope', 'patientSvc', '$location', 'fileReader', 'patientProfileModel', '$base64', "$timeout", 'ERR_TIME_OUT'];
var patientStage1Ctrl = function(scope, patientSvc, location, fileReader, patientProfileModel, base64, $timeout, ERR_TIME_OUT) {    
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.imageSrc = '../images/injured-person.png';
    scope.imageUploadSuccess = false;
    scope.onImageUpload = function($files){
        var success = function (response){
            waitingDialog.hide();            
            scope.imageUploadSuccess = true;
            $timeout(function(){
                scope.imageUploadSuccess = false;
            }, ERR_TIME_OUT)           
            // ngToast.create({
            //     'horizontalPosition*':'left',
            //     'verticalPosition*':'top',
            //     'content':'Image Uploaded Successfully'
            // });
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
                patientProfileModel.incrementUploadImageCount();
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
}

patientStage1Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage1Ctrl', patientStage1Ctrl);
// if(webcam.getCameraList().length == 0){  
//    alert('You don\'t have a web camera');  
// }

// navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
//                        navigator.webkitGetUserMedia ||
//                        navigator.mozGetUserMedia ||
//                        navigator.msGetUserMedia);

// navigator.getMedia({video: true}, function() {
//   // webcam is available
// }, function() {
//   // webcam is not available
// });