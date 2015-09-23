DEPS = []

var directive = function() {
    var linkCheckboxGrp = function (scope, elem, attrs){
        if(scope.checkedList.indexOf(scope.item.id) !== -1){
            elem[0].checked = true;
        }

        elem.bind('click', function(){
            var index = scope.checkedList.indexOf(scope.item.id);
            if(elem[0].checked){
                if(index === -1){
                    scope.checkedList.push(scope.item.id);
                }                
            } else {
                if(index !== -1){
                    scope.checkedList.splice(index, 1);
                }
            }
            scope.$apply(scope.checkedList.sort(function(a, b) {
                return a - b
            }));
        });
    }
    var checkboxGroup = {
        restrict: "A",
        scope : {
            checkedList : "=checkedList",
            item : "=item"
        },
        link : linkCheckboxGrp
    }

    return checkboxGroup;
}

DEPS.push(directive)
myWorkDoc.directive("checkboxGroup", DEPS)