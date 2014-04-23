function Login($scope, $rootScope, $firebase, $firebaseSimpleLogin, Authentication, $location) {

    $scope.loginObj = $firebaseSimpleLogin(Authentication.ref);
    $rootScope.loginObj = $scope.loginObj; 

	if ($scope.loginObj.user != null) {
		$location.path("/time-sheet");
	}
	
    // login callback
	$scope.login = function(email, password) {
		
		// firebase login
		$scope.loginObj.$login('password', {
			email: "mahieddine.ichir@gmail.com",
			password: "raf1978ika"
		}).then(function(user) {
			$location.path("/time-sheet");
		}, function(error) {
			$scope.log = "Authentication failed!";
		});
	};
};
