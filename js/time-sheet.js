function TimeSheet($scope, $rootScope, AuthenticationService, $location, BackendService) {

	if ($rootScope.loginObj.user == null) {
		$location.path("/");
	}

	// get all data
	$scope.ts = $firebase(Authentication.ref);
	$scope.ts.$bind($scope, "ts");
	
	// get data (asynchronous)
	$scope.ts.$on('loaded', function() {
		// $scope.keys = $scope.ts.$getIndex(); // how to get indexes
		// update from firebase
		var data = $scope.getFireBaseData($scope.year, $scope.month);
		if (data == null) {
			// no corresponding data => generate new one
			var dataDays = getCalendar($scope.year, $scope.month.index);
			data = {
				"year"  : $scope.year,
				"month" : $scope.month,
				"days"  : dataDays
			};
			
			$scope.current = $scope.ts.$add(data);
		}
		// data is in $scope.count
		$scope.days = $scope.ts[$scope.current].days;
	});

	/**
	 * TODO
	 */
	$scope.initializeDays = function() {
		
	};
	
	// TODO move to calendar.js
	$scope.months = months;
	
	// TODO move to calendar.js
	$scope.years = [2013, 2014, 2015, 2016];

	/**
	 * Initialize month and year to today.
	 */
	$scope.init = function() {
		
		var d = new Date();
		$scope.monthIndex = d.getMonth();
		$scope.yearIndex = $scope.years.indexOf(d.getFullYear());

		$scope.month = $scope.months[$scope.monthIndex];
		$scope.year = $scope.years[$scope.yearIndex];
	};
	
	/**
	 * Initialize controls change functions.
	 */
	$scope.change = function() {
		var data = $scope.getFireBaseData($scope.year, $scope.month);
		if (data == null) {
			// no corresponding data => generate new one
			var dataDays = getCalendar($scope.year, $scope.month.index);
			data = {
				"year"  : $scope.year,
				"month" : $scope.month,
				"days"  : dataDays
			};
			
			$scope.ts.$add(data);
			$scope.days = data.days;
			
		}
		// data is in $scope.count
		$scope.days = data.days;
	};

	/**
	 * return total days rate: day.rate aggregator.
	 */
	$scope.getTotal = function() {
		var total = 0;
		angular.forEach($scope.days, function(day) {
			total += day.rate;
		});
		return total;
	};
	
	/**
	 * return total rate of non-working days -from day.rate)
	 */
	$scope.getTotalOff = function() {
		var total = 0;
		angular.forEach($scope.days, function(day) {
			if (day.type == "half") {
				total += 0.5;
			} else if (day.type == "none") {
				total += 1.0;
			} else if (day.type == "full") {
				// 0
			}
		});
		return total;
	};

	/**
	 * Lifecycle to change the rate of a day.
	 * we -> |
	 * full -> none -> half -> full
	 */
	$scope.changeType = function(day) {
		if (day.type == "we") {
			return;
		}
		if (day.type == "full") {
			day.type = "none";
		} else if (day.type == "none") {
			day.type = "half";
		} else if (day.type == "half") {
			day.type = "full";
		}
		day.rate = getRate(day.type);
	};

	
	/**
	 * return the data corresponding to the input year and month
	 */
	$scope.getFireBaseData = function(year, month) {
		var ret = null;
		var count = 0;
		angular.forEach($scope.ts, function(msg, key) {
			if (msg != null && msg.year == year && msg.month.index == month.index) {
				$scope.current = key;
				ret = msg;
				keepGoing = false;
			}
			count++;
		});
		return ret;
	};
	
	/**
	 * On control save click.
	 */
	$scope.save = function() {
		$scope.ts.$set($scope.ts);
	};

};