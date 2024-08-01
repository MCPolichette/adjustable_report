google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart1);

function drawChart1() {
	console.log(report.monthArray);
	let array = [["Month", "Sales"]];
	for (i = 0; i < report.monthArray.length; i++) {
		array.push([report.monthArray[i].Month, report.monthArray[i].Sales]);
	}
	const data = google.visualization.arrayToDataTable(array);
	const options = {
		title: "Sales Performance By Month",
		width: 1100,
		height: 250,
		hAxis: { slantedText: true },
		vAxis: {
			format: "currency",
			gridlines: { color: "black", minSpacing: 20 },
		},
	};
	const chart = new google.visualization.ColumnChart(
		document.getElementById("monthlyPerformanceGraph")
	);
	chart.draw(data, options);
}

function drawSalesVConversionChart(title, divId, hAxisTitle) {
	//build an array like the example below, ( Month, Sales $number, CR percentage.)
	var arr = [];
	for (i = 0; i < data.monthlyPerformanceSummary.length; i++) {
		arr.push([
			data.monthlyPerformanceSummary[i].Month,
			data.monthlyPerformanceSummary[i].Sales,
			data.monthlyPerformanceSummary[i].Conversion_Rate / 100,
		]);
	}
	arr.reverse();
	arr.unshift(["Month", "Sales", "Conversion Rate"]);
	var chartData = google.visualization.arrayToDataTable(arr);

	var options = {
		title: "Monthly Sales and Conversion Rate",
		width: 1100,
		height: 500,
		hAxis: {
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
			0: { type: "bars", targetAxisIndex: 0 },
			1: { type: "line", targetAxisIndex: 1 },
		},
	};

	var chart = new google.visualization.ComboChart(
		document.getElementById("monthlyPerformanceGraph")
	);
	chart.draw(chartData, options);
}

function drawDailyNumberOfSalesVConversionChart(title, divId, hAxisTitle) {
	//build an array like the example below, ( Month, Sales $number, CR percentage.)
	var arr = [];
	for (i = 0; i < data.monthlyPerformanceSummary.length; i++) {
		arr.push([
			data.monthlyPerformanceSummary[i].Month,
			data.monthlyPerformanceSummary[i].Number_of_Sales,
			data.monthlyPerformanceSummary[i].Conversion_Rate / 100,
		]);
	}
	arr.reverse();
	arr.unshift(["Month", "Sales", "Conversion Rate"]);
	var chartData = google.visualization.arrayToDataTable(arr);
	var chartData = google.visualization.arrayToDataTable(arr);

	var options = {
		title: "Number of Sales and Conversion Rate",
		width: 1100,
		height: 250,
		hAxis: {
			textStyle: {
				fontSize: 10, // Adjust the font size as desired
				color: "#333", // Adjust the font color as desired
			},
			slantedText: true, // Enable slanted text for better readability
			slantedTextAngle: 19, // Adjust the rotation angle of the labels as desired
		},
		vAxes: {
			0: { title: "Number of Sales" },
			1: { title: "Conversion Rate", format: "#%" },
		},
		series: {
			0: { type: "bars", targetAxisIndex: 0 },
			1: { type: "line", targetAxisIndex: 1 },
		},
	};

	var chart = new google.visualization.ComboChart(
		document.getElementById("secondPerformanceChart")
	);
	completeButton("dailyReportButton", "Graphs displayed");
	chart.draw(chartData, options);
}
