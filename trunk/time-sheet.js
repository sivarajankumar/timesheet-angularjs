function TimeSheet($scope) {

	$scope.month = 1;
	$scope.monthLabel = getMonthLabel($scope.month);
	
	$scope.year = 2014;

	// Initialize month days
	$scope.init = function() {

		$scope.days = [];
		var d = new Date($scope.year, $scope.month, 1, 0, 0, 0, 0); 
		var m = d.getMonth();

		for (var i=1; i<=31; i++) {
			
			d.setDate(i);
			var dow = d.getDay();
			var m_ = d.getMonth();
			var type;
			if ((dow == 0) || (dow == 6)) {
				type = "we";
			} else {
				type = "full";
			}
			if (m_ == m)
			{
				var newData = {
					"day": d.getDate(),
					"type" : type,
					"rate" : getRate(type)
				};
				$scope.days.push(newData);
			}
		}
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

};