function buildYoyMonthlyTable() {
	let table = document.getElementById("ytdSummaryReport");
	let thead = document.getElementById("ytdSummaryTHead");
	table.classList.add("yoyTable");
	let summaryHeadersArray = [
		"Month",
		"Revenue \n Gross",
		"Prior\n Year\n Revenue \nGross",
		"Revenue\n change",
		"Orders \n Gross",
		"Prior\n Year\n Orders \nGross",
		"Orders\n change",
		"Total \nNetwork \nSpend",
		"Prior\n Year\n Total \nNetwork \nSpend",
		"Total\n change",
		"Clicks",
		"Prior\n Year\n Clicks",
		"Clicks\n change",
		"Impressions",
		"Prior\n Year\n Impressions",
		"Impressions\n change",
		"CR",
		"Prior\n Year\n CR",
		"CR\n change",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}
	console.log(report.monthArray);
	table.style.textAlign = "right";
	for (var j = 0; j < report.monthArray.length; j++) {
		console.log("ATTENTION!!!!!", j);
		let Click_ThroughChange =
			report.monthArray[j].Click_Throughs -
			report.lyMonthArray[j].Click_Throughs;
		let Ad_ImpressionChange =
			report.monthArray[j].Ad_Impressions -
			report.lyMonthArray[j].Ad_Impressions;
		let SaleChange =
			report.monthArray[j].Sales - report.lyMonthArray[j].Sales;
		let Number_of_SalesChange =
			report.monthArray[j].Number_of_Sales -
			report.lyMonthArray[j].Number_of_Sales;
		let TotalNetworkSpend =
			report.monthArray[j].Network_Commissions +
			report.monthArray[j].Commissions +
			report.monthArray[j].Incentives;
		let LyTotalNetworkSpend =
			report.lyMonthArray[j].Network_Commissions +
			report.lyMonthArray[j].Commissions +
			report.lyMonthArray[j].Incentives;
		let NetworkSpendChange = TotalNetworkSpend - LyTotalNetworkSpend;

		let Conversion_RateChange =
			report.monthArray[j].Conversion_Rate -
			report.lyMonthArray[j].Conversion_Rate;

		buildRow(table, j, [
			report.monthArray[j].Month,
			toUSD(report.monthArray[j].Sales),
			toUSD(report.lyMonthArray[j].Sales),
			applyIcon(SaleChange) + isNegOrPos(SaleChange) + toUSD(SaleChange),
			//vertical line
			report.monthArray[j].Number_of_Sales,
			report.lyMonthArray[j].Number_of_Sales,
			applyIcon(Number_of_SalesChange) +
				isNegOrPos(Number_of_SalesChange) +
				Number_of_SalesChange,
			//vertical line
			toUSD(TotalNetworkSpend),
			toUSD(LyTotalNetworkSpend),
			applyIcon(NetworkSpendChange) +
				isNegOrPos(NetworkSpendChange) +
				toUSD(NetworkSpendChange),
			//vertical line
			report.monthArray[j].Click_Throughs,
			report.lyMonthArray[j].Click_Throughs,
			applyIcon(Click_ThroughChange) +
				isNegOrPos(Click_ThroughChange) +
				Click_ThroughChange,
			//verticle line
			report.monthArray[j].Ad_Impressions,
			report.lyMonthArray[j].Ad_Impressions, //ly
			applyIcon(Ad_ImpressionChange) +
				isNegOrPos(Ad_ImpressionChange) +
				Ad_ImpressionChange,
			//verticle line
			report.monthArray[j].Conversion_Rate + "%",
			report.lyMonthArray[j].Conversion_Rate + "%", //ly
			applyIcon(Conversion_RateChange) +
				isNegOrPos(Conversion_RateChange) +
				Conversion_RateChange.toFixed(2),
			//verticle line
		]);
	}
}
