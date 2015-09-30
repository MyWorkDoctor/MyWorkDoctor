var DEPS = ['$scope', 'patientProfileModel', '$location', 'QUICK_BLOX_CONFIG',];
var appCtrl = function(scope, patientProfileModel, location, QUICK_BLOX_CONFIG) {
    scope.viewOptions = {}

    QB.init(QUICK_BLOX_CONFIG.appId, QUICK_BLOX_CONFIG.authKey, QUICK_BLOX_CONFIG.authSecret, QUICK_BLOX_CONFIG.options);

    QB.webrtc.onSessionStateChangedListener = function(newState, userId) {
        console.log("onSessionStateChangedListener: " + newState + ", userId: " + userId);

          // possible values of 'newState':
          //
          // QB.webrtc.SessionState.UNDEFINED
          // QB.webrtc.SessionState.CONNECTING
          // QB.webrtc.SessionState.CONNECTED
          // QB.webrtc.SessionState.FAILED
          // QB.webrtc.SessionState.DISCONNECTED
          // QB.webrtc.SessionState.CLOSED
          var data = {
            "newState": newState,
            "userId": userId
          }
          scope.$broadcast('onSessionStateChangedListener', data);
    };

    QB.webrtc.onCallListener = function(userId, extension) {
      console.log("onCallListener. userId: " + userId + ". Extension: " + JSON.stringify(extension));
      var data = {
        "userId": userId,
        "extension": extension
      }
      scope.$broadcast('onCallListener', data);
    };

    QB.webrtc.onAcceptCallListener = function(userId, extension) {
      console.log("onAcceptCallListener. userId: " + userId + ". Extension: " + JSON.stringify(extension));
        var data = {
          "userId": userId,
          "extension": extension
        }
        scope.$broadcast('onAcceptCallListener', data);     
    };

    QB.webrtc.onRejectCallListener = function(userId, extension) {
      console.log("onRejectCallListener. userId: " + userId + ". Extension: " + JSON.stringify(extension));
      var data = {
        "userId": userId,
        "extension": extension
      }
      scope.$broadcast('onRejectCallListener', data);        
    };

    QB.webrtc.onStopCallListener = function(userId, extension) {
      console.log("onStopCallListener. userId: " + userId + ". Extension: " + JSON.stringify(extension));
      var data = {
        "userId": userId,
        "extension": extension
      }
      scope.$broadcast('onStopCallListener', data);
    };

    QB.webrtc.onRemoteStreamListener = function(stream) {      
      var data = {
        "stream": stream
      }
      scope.$broadcast('onRemoteStreamListener', data);
    };

    QB.webrtc.onUserNotAnswerListener = function(userId) {
      console.log("onUserNotAnswerListener. userId: " + userId);
      var data = {
        "userId": userId
      }
      scope.$broadcast('onUserNotAnswerListener', data);
    };

    if(patientProfileModel.isAppSession){
        location.path("/");
    }
}

appCtrl.$inject = DEPS;
myWorkDoc.controller('appCtrl', appCtrl);