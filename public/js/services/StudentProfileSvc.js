DEPS = ["$q", "$http", "$log"]

factory = function($q, $http, log) {
    StudentProfile = {

    }

    return {
        StudentProfile : StudentProfile
    }
}

var ngModule = angular.module("MyWorkDoc")
DEPS.push(factory)
ngModule.factory("StudentProfileSvc", DEPS)