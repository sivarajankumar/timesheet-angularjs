'use strict';

var myProject = angular.module('project', ['ngRoute', 'firebase', 'ui.bootstrap'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/time-sheet', {controller:'TimeSheet', templateUrl:'views/time-sheet.html'})
			.when('/invoice', {controller:'Facture', templateUrl:'views/facture.html'})
			.when('/login', {controller: 'Login', templateUrl: 'views/login.html'})
			.otherwise({redirectTo:'/login'});
	});

myProject.factory('Authentication', function($rootScope, $firebase, $location) {

	var ref = new Firebase("https://tsangularjs.firebaseio.com/ts");
	$rootScope.loginObj = [];// TODO watch
	
//	$rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
//		Authentication.user = null;
//		$location.path("/");
//	});
//	
//	$rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
//		Authentication.user = user;
//		$location.path("/time-sheet");
//	});
	
	return {
		"ref": ref,
		"loginObj" : $rootScope.loginObj,
		"user": null
	};
});

myProject.filter('euro', function() {
		return function(data) {
			var value = "" + data; // convert to string
			if (value.length > 3) {
				return value.charAt(0) + ' ' + value.substring(1) + ' €';	
			} else {
				return value + ' €';
			}
			
		}
	});

//	.controller('TimeSheet', function($scope, $firebase) {
//		var ts = new Firebase("https://tsangularjs.firebaseio.com/time-sheets");
//		$scope.data = $firebase(ts);
//	});
	
	//.value('fbURL', 'https://tsangularjs.firebaseio.com/')
//	.factory('Projects', function($firebase, fbURL) {
//		return $firebase(new Firebase(fbURL));
//	})