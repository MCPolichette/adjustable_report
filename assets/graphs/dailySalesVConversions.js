function drawDailySalesVConversionChart(title, divId, hAxisTitle) {
	//build an array like the example below, ( Month, Sales $number, CR percentage.)
	// var arr = data.dailyPerformance;
	// var chartData = google.visualization.arrayToDataTable(arr);

	// var options = {
	// 	title: "Daily Sales and Conversion Rate",
	// 	width: 1100,
	// 	height: 250,
	// 	hAxis: {
	// 		textStyle: {
	// 			fontSize: 10, // Adjust the font size as desired
	// 			color: "#333", // Adjust the font color as desired
	// 		},
	// 		slantedText: true, // Enable slanted text for better readability
	// 		slantedTextAngle: 19, // Adjust the rotation angle of the labels as desired
	// 	},
	// 	vAxes: {
	// 		0: { title: "Sales", format: "$#,###" },
	// 		1: { title: "Conversion Rate", format: "#%" },
	// 	},
	// 	series: {
	// 		0: { type: "bars", targetAxisIndex: 0 },
	// 		1: { type: "line", targetAxisIndex: 1 },
	// 	},
	// };

	// var chart = new google.visualization.ComboChart(
	// 	document.getElementById("dailyPerformanceGraph")
	// );
	// chart.draw(chartData, options);
	drawDailyNumberOfSalesVConversionChart(
		"secondChart",
		"numOfSalesChart",
		"Sales"
	);
}
