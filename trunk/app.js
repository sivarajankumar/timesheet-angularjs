'use strict';
angular.module('project', [])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {controller:'TimeSheet', templateUrl:'time-sheet.html'})
			.otherwise({redirectTo:'/'});
	}]);