DEPS = []

var filter = function() {
    return function(tasks, tags){
        return tasks.filter(function(task){
            if(tags.indexOf(task.id) !== -1){
                return true;
            }
            return false;
        });
    }
}

DEPS.push(filter)
myWorkDoc.filter("selectedObjects", DEPS)