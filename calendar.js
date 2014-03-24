function getCalendar(year, month) {
	
	var days = [];
	var d = new Date(year, month, 1, 0, 0, 0, 0); 
	var m = d.getMonth();
	
	for (var i=1; i<=31; i++) {
		// update date
		d.setDate(i);
		var type; // day type we or working
		var dow = d.getDay(); // day of week
		if ((dow == 0) || (dow == 6)) {
			type = "we"; // week end day
		} else {
			type = "full"; // working day
		}
		var m_ = d.getMonth();
		if (m_ == m) // same month
		{
			var newData = {
				"day": d.getDate(), // day of month
				"type" : type,
				"rate" : getRate(type)
			};
			days.push(newData);
		}
	}
	
	return days;
}