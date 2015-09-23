var DEPS = ['$scope', '$location', '$log', '$filter', "patientSvc", 'patientProfileModel'];
var patientQueryCtrl = function(scope, location, log, filter, patientSvc, patientProfileModel) {
    scope.viewOptions.headerTitle =  patientProfileModel.getHeaderTitle();
    scope.injuryPartsCheckedList = [];
    scope.injuryNatureCheckedList = [];
    scope.Options = {}    
    scope.injuryPartsList = [
        {
            "id":1,
            "value":"Cut"
        },
        {
            "id":2,
            "value":"Burn"
        },
        {
            "id":3,
            "value":"Strain/Sprain"
        },
        {
            "id":4,
            "value":"Crush"
        }
    ]
    scope.injuryNatureList = [
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
                setInjuredParts(nxtUrl)
                break;
            case 3:                
                setNatureOfInjury(nxtUrl)
                break;
            case 4:                
                patientProfileModel.setPainLevel(scope.painLevel);
                var injuredParts = getValuesArray(patientProfileModel.getInjuredParts().listedInjuredParts);
                injuredParts.push(patientProfileModel.getInjuredParts().otherInjuredParts)
                var injuryNature = getValuesArray(patientProfileModel.getInjuryNature().listedInjuryNature);
                
                var obj = {
                    "Questions":[ 
                        {
                            "Question" : "What is the Nature of injury?",
                            "Answers" : injuredParts
                        }, 
                        {
                            "Question" : "What part of body is injured?",
                            "Answers" : injuryNature
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
}

patientQueryCtrl.$inject = DEPS;
myWorkDoc.controller('patientQueryCtrl', patientQueryCtrl);