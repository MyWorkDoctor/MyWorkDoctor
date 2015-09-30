var DEPS = ['$scope', '$location', '$log', '$filter', "patientSvc", 'patientProfileModel'];
var patientQueryCtrl = function(scope, location, log, filter, patientSvc, patientProfileModel) {
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.injuryNatureCheckedList = [];
    scope.injuryPartsCheckedList = [];
    scope.Options = {}
    scope.viewOptions.isOthers = false;
    scope.viewOptions.errMsg = null;
    scope.injuryNatureList = [
        {
            "id":1,
            "value":"Burn"
        },
        {
            "id":2,
            "value":"Crush"
        },
        {
            "id":3,
            "value":"Cut"
        },
        {
            "id":4,
            "value":"Strain/Sprain"
        },
        {
            "id":5,
            "value":"Others"
        }
    ]
    scope.injuryPartsList = [
        {
            "id":1,
            "value":"Head"
        },
        {
            "id":2,
            "value":"Neck"
        },
        {
            "id":3,
            "value":"Torso"
        },
        {
            "id":4,
            "value":"Hand"
        },
        {
            "id":5,
            "value":"Arm"
        },
        {
            "id":6,
            "value":"Leg"
        },
        {
            "id":7,
            "value":"Foot"
        }
    ]
    scope.previous = function(prevUrl){
        location.path(prevUrl);
    }
    scope.next = function(nxtUrl, pageNo){
        switch(pageNo){
            case 2:                                
                setNatureOfInjury(nxtUrl)
                break;
            case 3:                
                setInjuredParts(nxtUrl)
                break;
            case 4:                
                patientProfileModel.setPainLevel(scope.painLevel);
                var injuredParts = getValuesArray(patientProfileModel.getInjuredParts().listedInjuredParts);
                var otherInjuredParts = patientProfileModel.getInjuredParts().otherInjuredParts;
                if(otherInjuredParts !== undefined && otherInjuredParts !== null && otherInjuredParts !== ""){
                    injuredParts.push(otherInjuredParts)
                }                
                var injuryNature = getValuesArray(patientProfileModel.getInjuryNature().listedInjuryNature);
                
                var obj = {
                    "roomid": patientProfileModel.getRoomId(),
                    "user_id" : patientProfileModel.getPatientId(),
                    "Questions":[ 
                        {
                            "Question" : "What is the Nature of injury?",
                            "Answers" : injuryNature
                        }, 
                        {
                            "Question" : "What part of body is injured?",
                            "Answers" : injuredParts
                        }
                    ],
                    "severity":patientProfileModel.getPainLevel()
                }
                log.log("Final Obj", JSON.stringify(obj));
                patientQueries(obj, nxtUrl);                
                break;
        }        
    }
    var setInjuredParts = function (nxtUrl) {
        var listedInjuredParts = filter("selectedObjects")(scope.injuryPartsList, scope.injuryPartsCheckedList);
        var obj = {
            "listedInjuredParts" : listedInjuredParts,
            "otherInjuredParts" : scope.otherInjuredParts
        }        
        patientProfileModel.setInjuredParts(obj);
        location.path(nxtUrl);
    }
    var setNatureOfInjury = function (nxtUrl){
        var listedInjuryNature = filter("selectedObjects")(scope.injuryNatureList, scope.injuryNatureCheckedList);
        var obj = {
            "listedInjuryNature" : listedInjuryNature,
            "options" : scope.Options
        }        
        patientProfileModel.setInjuryNature(obj);
        location.path(nxtUrl);
    }
    scope.ratePainLevel = function(painLevel){
        scope.painLevel = painLevel
    }
    var getValuesArray = function(arrOfObj){
        var valArray = []
        angular.forEach(arrOfObj, function(obj){
            valArray.push(obj.value);
        });
        return valArray;
    }
    var patientQueries = function (obj, nxtUrl){        
        var success = function (response){
            waitingDialog.hide();
            location.path(nxtUrl);
        }
        var failure = function (errMsg){
            waitingDialog.hide();
            scope.viewOptions.errMsg = errMsg;
        }
        return patientSvc.addQuestions(obj)
            .then(success, failure)
    }
    scope.$watchCollection("injuryNatureCheckedList", function(newVal){
        if(scope.injuryNatureCheckedList.indexOf(5) != -1){
            scope.viewOptions.isOthers = true
        } else {
            scope.viewOptions.isOthers = false
        }
    })
}

patientQueryCtrl.$inject = DEPS;
myWorkDoc.controller('patientQueryCtrl', patientQueryCtrl);