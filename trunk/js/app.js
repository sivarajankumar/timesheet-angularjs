'use strict';

angular.module('services', ['firebase'])
	.factory('BackendService', function($firebase) {
		var url = "https://tsangularjs.firebaseio.com/ts";
		var ref = new Firebase(url);
		var loginObj = $firebaseSimpleLogin(ref);
		return {
			url: url,
			ref : ref,
			loginObj : loginObj
		};
	})
	.service('Session', function() {
		this.create = function(user) {
			this.user = user;
		};
		this.destroy = function() {
			this.user = null;
		};
		return this;
	})
	.factory('AuthenticationService', function(BackendService, Session) {
		return {
			login: function(credentials) {
				BackendService.loginObj.$login('password', {
					email: credentials.email,
					password: credentials.password
				}).then(function(user) {
					Session.create(user);
				}, function(error) {
					// ERROR
				});
			},
			logout: function() {
				BackendService.loginObj.$logout()
					.then(function() {
						Session.destroy();
					});
			},
			isAuthenticated: function() {
				return !!Session.user;
			}
		};
	})
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
  		logoutSuccess: 'auth-logout-success',
  		sessionTimeout: 'auth-session-timeout',
  		notAuthenticated: 'auth-not-authenticated',
  		notAuthorized: 'auth-not-authorized'
	});


var myProject = angular.module('project', ['ngRoute', 'services', 'ui.bootstrap'])
	.config(function($routeProvider) {
		$routeProvider
			.when('/time-sheet', {controller:'TimeSheet', templateUrl:'views/time-sheet.html'})
			.when('/invoice', {controller:'Facture', templateUrl:'views/facture.html'})
			.when('/', {controller: 'Login', templateUrl: 'views/login.html'})
			.otherwise({redirectTo:'/'});
	});


//myProject.factory('Authentication', function($rootScope, $firebase, $location) {

//	var ref = new Firebase("https://tsangularjs.firebaseio.com/ts");
//	$rootScope.loginObj = [];// TODO watch
	
//	$rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
//		Authentication.user = null;
//		$location.path("/");
//	});
//	
//	$rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
//		Authentication.user = user;
//		$location.path("/time-sheet");
//	});
	
//	return {
//		"ref": ref,
//		"loginObj" : $rootScope.loginObj,
//		"user": null
//	};
//});

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

myProject.controller('ApplicationController', function($scope, AuthenticationService) {

	$scope.user = null;

});

//	.controller('TimeSheet', function($scope, $firebase) {
//		var ts = new Firebase("https://tsangularjs.firebaseio.com/time-sheets");
//		$scope.data = $firebase(ts);
//	});
	
	//.value('fbURL', 'https://tsangularjs.firebaseio.com/')
//	.factory('Projects', function($firebase, fbURL) {
//		return $firebase(new Firebase(fbURL));
//	})