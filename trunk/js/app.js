'use strict';
angular.module('project', ['ngRoute', 'firebase'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/timesheet', {controller:'TimeSheet', templateUrl:'views/time-sheet.html'})
			.when('/invoice', {controller:'Facture', templateUrl:'views/facture.html'})
			.otherwise({redirectTo:'/timesheet'});
	});

//	.controller('TimeSheet', function($scope, $firebase) {
//		var ts = new Firebase("https://tsangularjs.firebaseio.com/time-sheets");
//		$scope.data = $firebase(ts);
//	});
	
	//.value('fbURL', 'https://tsangularjs.firebaseio.com/')
//	.factory('Projects', function($firebase, fbURL) {
//		return $firebase(new Firebase(fbURL));
//	})