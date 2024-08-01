function drawYoySalesVConversionChart(title, divId, hAxisTitle) {
	// Build an array like the example below, (Month, Sales $number, CR percentage, Prior Year Sales, Prior Year CR percentage)
	console.log("SalesConversionChart");
	var arr = [];
	for (var i = 0; i < data.monthlyPerformanceSummary.length; i++) {
		arr.push([
			data.primaryMonths[i].Month,
			data.primaryMonths[i].Sales,
			data.primaryMonths[i].Conversion_Rate / 100,
			data.priorMonths[i].Sales,
			data.priorMonths[i].Conversion_Rate / 100,
		]);
	}

	arr.reverse();
	arr.unshift([
		"Month",
		"Sales",
		"Conversion Rate",
		"Prior Year Sales",
		"Prior Year Conversion Rate",
	]);
	console.log(arr);
	var chartData = google.visualization.arrayToDataTable(arr);

	var options = {
		title: title,
		width: 1100,
		height: 500,
		hAxis: {
			title: hAxisTitle,
			textStyle: {
				fontSize: 10, // Adjust the font size as desired
				color: "#333", // Adjust the font color as desired
			},
			slantedText: true, // Enable slanted text for better readability
			slantedTextAngle: 19, // Adjust the rotation angle of the labels as desired
		},
		vAxes: {
			0: { title: "Sales", format: "$#,###" },
			1: { title: "Conversion Rate", format: "#%" },
		},
		series: {
			0: { type: "bars", targetAxisIndex: 0, color: "#3366cc" },
			1: { type: "line", targetAxisIndex: 1, color: "#3366cc" },
			2: { type: "bars", targetAxisIndex: 0, color: "#f45850" }, // Prior Year Sales Bar
			3: { type: "line", targetAxisIndex: 1, color: "#f45850" }, // Prior Year Conversion Rate Line
		},
	};

	var chart = new google.visualization.ComboChart(
		document.getElementById(divId)
	);
	chart.draw(chartData, options);
	console.log("SaleConversionChart complete");
}
