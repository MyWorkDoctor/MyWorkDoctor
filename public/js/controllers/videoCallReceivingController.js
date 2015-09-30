var DEPS = ['$scope', '$location', 'patientProfileModel', 'QUICK_BLOX_CONFIG', '$timeout'];
var patientStage5Ctrl = function(scope, location, patientProfileModel, QUICK_BLOX_CONFIG, $timeout) {
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    var calleeId = null
    var mediaParams = null
    scope.isVideoCall = false
    scope.previous = function(){
        location.path("/patientStage4");
    }
    scope.next = function(){
        location.path("/patientStage6");           
    }

    scope.rejectCall = function(){
        $('#ringtoneSignal')[0].pause();

        if (calleeId !== null){
          QB.webrtc.reject(calleeId);
        }
    }

    var hungUp = function(){      
        $('#ringtoneSignal')[0].pause();      
        $('video').attr('src', '');
        $('#callingSignal')[0].pause();
        $('#endCallSignal')[0].play();
    }

    var receiveCallWithParams = function(data){
        mediaParams = {
            audio: true,
            video: data.extension.callType === 'video' ? true : false,
            elemId: 'localVideo',
            options: {
              muted: true,
              mirror: true
            }
        };
        var success = function(){
            onAcceptCallListener();
            QB.webrtc.accept(calleeId);
        }

        var error = function(err){
            console.log(err);
            var deviceNotFoundError = 'Devices are not found';
            QB.webrtc.reject(calleeId, {'reason': deviceNotFoundError});
        }
        QB.webrtc.getUserMedia(mediaParams, function(err, stream) {
            if (err) {
              error(err)
            } else {
              success(stream)
            }
          });        
    }

    var onSessionStateChangedListener = function(event, data){
        if(data.newState === QB.webrtc.SessionState.DISCONNECTED){
            if (calleeId !== null){
              QB.webrtc.stop(calleeId);
            }
            hungUp();
        } else if(data.newState === QB.webrtc.SessionState.CLOSED){
            hungUp();
        }
    }

    var onCallListener = function(event, data){
        calleeId = data.extension.callerID        
        $('#ringtoneSignal')[0].play();
        receiveCallWithParams(data)       
    }

    var onAcceptCallListener = function(event, data){
        $('#callingSignal')[0].pause();
        scope.isVideoCall = true;
        scope.$apply();
    }

    var onRejectCallListener = function(event, data){        
        $('video').attr('src', '');
        $('#callingSignal')[0].pause();        
    }

    var onStopCallListener = function(event, data){
        hungUp();
    }

    var onRemoteStreamListener = function(event, data){
        QB.webrtc.attachMediaStream('remoteVideo', data.stream);
    }

    var onUserNotAnswerListener = function(event, data){
        console.log("onUserNotAnswerListener. userId: " + userId);
    }

    scope.$on('onSessionStateChangedListener', onSessionStateChangedListener);
    scope.$on('onCallListener', onCallListener);
    scope.$on('onAcceptCallListener', onAcceptCallListener);
    scope.$on('onRejectCallListener', onRejectCallListener);
    scope.$on('onStopCallListener', onStopCallListener)
    scope.$on('onRemoteStreamListener', onRemoteStreamListener)
    scope.$on('onUserNotAnswerListener', onUserNotAnswerListener)
    
}

patientStage5Ctrl.$inject = DEPS;
myWorkDoc.controller('patientStage5Ctrl', patientStage5Ctrl);