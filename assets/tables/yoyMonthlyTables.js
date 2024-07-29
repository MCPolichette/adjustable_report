function buildYoyMonthlyTable() {
	let table = document.getElementById("ytdSummaryReport");
	let thead = document.getElementById("ytdSummaryTHead");
	let summaryHeadersArray = [
		"Month",
		"Revenue \n Gross",
		"Prior Year\n Revenue \nGross",
		"Revenue\n difference",
		"Orders \n Gross",
		"Prior Year\n Orders \nGross",
		"Orders\n difference",
		"Total Network Spend",
		"Prior Year\n Total NetworkSpend",
		"Total\n difference",
		"Clicks",
		"Prior Year\n Clicks",
		"Clicks\n difference",
		"Impressions",
		"Prior Year\n Impressions",
		"Impressions\n difference",
		"CR",
		"Prior Year\n CR",
		"CR\n difference",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}
	console.log(data.monthlyPerformanceSummary);
	table.style.textAlign = "right";
	for (var j = 0; j < data.monthlyPerformanceSummary.length; j++) {
		console.log("ATTENTION!!!!!", j);
		buildRow(table, j, [
			data.monthlyPerformanceSummary[j].Month,
			toUSD(data.monthlyPerformanceSummary[j].Sales),
			data.monthlyPerformanceSummary[j].Number_of_Sales,
			toUSD(
				data.monthlyPerformanceSummary[j].Network_Commissions +
					data.monthlyPerformanceSummary[j].Commissions +
					data.monthlyPerformanceSummary[j].Incentives
			),
			data.monthlyPerformanceSummary[j].Click_Throughs,
			data.monthlyPerformanceSummary[j].Click_Throughs,
			data.monthlyPerformanceSummary[j].Click_Throughs,
			data.monthlyPerformanceSummary[j].Ad_Impressions,
			data.monthlyPerformanceSummary[j].Ad_Impressions,
			data.monthlyPerformanceSummary[j].Ad_Impressions,
			data.monthlyPerformanceSummary[j].Conversion_Rate + "%",
			data.monthlyPerformanceSummary[j].Conversion_Rate + "%",
			data.monthlyPerformanceSummary[j].Conversion_Rate + "%",
		]);
	}
}
