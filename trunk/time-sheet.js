function TimeSheet($scope, $firebase) {

	var ref = new Firebase("https://tsangularjs.firebaseio.com/ts");
	// get all data
	$scope.ts = $firebase(ref);
	//$scope.ts.$bind($scope, "ts");
	
	$scope.update = true;
	// get keys
	$scope.ts.$on('loaded', function() {
		$scope.keys = $scope.ts.$getIndex();
		// update from firebase
		var data = $scope.getFireBaseData($scope.year, $scope.month);
		if (data == null) {
			$scope.days = getCalendar($scope.year, $scope.month.index);
			$scope.update = false;
		} else {
			$scope.days = data.days;
			$scope.update = true;
		}
	});

	$scope.initializeDays = function() {
		
	};
	
	$scope.months = [
	                 {"label": "Janvier", "index": 0},
	                 {"label": "F\u00E9vrier", "index": 1},
	                 {"label": "Mars", "index": 2}
	                 ];
	$scope.years = [2013, 2014, 2015, 2016];

	// initialize month and year
	$scope.init = function() {
		
		var d = new Date();
		$scope.monthIndex = d.getMonth();
		$scope.yearIndex = $scope.years.indexOf(d.getFullYear());

		$scope.month = $scope.months[$scope.monthIndex];
		$scope.year = $scope.years[$scope.yearIndex];
		
		/**
		var data = $scope.getFireBaseData($scope.messages, $scope.year, $scope.month);
		if (data == null) {
			$scope.log = "new";
			$scope.days = getCalendar($scope.year, $scope.month.index);
		} else {
			$scope.log = "firebase";
			$scope.days = data.days;
		}
		*/
	};
	
	// Initialize month days
	$scope.change = function() {
	};

	$scope.getTotal = function() {
		var total = 0;
		angular.forEach($scope.days, function(day) {
			total += day.rate;
		});
		return total;
	};
	
	$scope.getTotalOff = function() {
		var total = 0;
		angular.forEach($scope.days, function(day) {
			if (day.type == "half") {
				total += 0.5;
			} else if (day.type == "none") {
				total += 1.0;
			}
		});
		return total;
	};
	
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

	$scope.getFireBaseData = function(year, month) {
		var ret;
		angular.forEach($scope.ts, function(msg) {
			if (msg != null && msg.year == year && msg.month.index == month.index) {
				ret = msg;
				keepGoing = false;
			}
		});
		return ret;
	};
	
	$scope.save = function() {
		var data = {
			"year": $scope.year,
			"month": $scope.month,
			"days": $scope.days
		};
		if ($scope.update) {
			$scope.ts.$update(data);
		} else {
			$scope.ts.$add(data);
		}
//		
//		var fdata = $scope.getFireBaseData($scope.year, $scope.month);
//		if (fdata == null) {
//			var data = {
//					"year": $scope.year,
//					"month": $scope.month,
//					"days": $scope.days
//			};
//			$scope.x = $scope.messages.$add(data);
//		} else {
//			$scope.x = $scope.messages.$save($scope.days);
//		}
		
//		var newData = true;
//		angular.forEach($scope.messages, function(msg) {
//			if (msg.year == $scope.year && msg.month.index == $scope.month.index) {
//				// update
//				//$scope.messages.$update(data);
//				newData = false;
//				keepGoing = false;
//			}
//		});
//		if (newData) {
//			// add new
//		}
		
//		var ts = new Firebase($scope.fbUrl);
//		$scope.ts = $firebase(ts);
//		
//		$scope.ts.$update(data);
//		//ts.set({date: $scope.year, days: $scope.days});
		//var year = ts.child($scope.year);
		//var month = year.child($scope.month);
		//month.set(data);
	};

};