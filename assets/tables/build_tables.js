function buildRow(table, row, columns) {
	var row = table.insertRow(row);
	for (z = 0; z < columns.length; z++) {
		var cell = (row.insertCell(z).innerHTML = columns[z]);
	}
}
function updateTableCell(tableId, rowNum, colNum, newText) {
	console.log(tableId, rowNum, colNum, newText);
	// Get a reference to the table
	let table = document.querySelector(tableId);
	// Get a reference to the cell
	let row = table.row[rowNum];
	let cell = row.cell[colNum];
	// Update the innerHTML of the cell
	cell.innerHTML = newText;
}

function add_borders(table_id, column) {
	var table = document.getElementById(table_id);
	var totalRowCount = table.rows.length - 1;
	for (i = 0; i < totalRowCount + 1; i++) {
		table.rows[i].cells[column].style.cssText +=
			"border-left-width :2px;  border-style:solid; border-left-color: #000000";
	}
}
function hideColumn(tableId, columnIndex) {
	console.log("hiding Columns");
	let table = document.getElementById(tableId);
	let rows = table.rows;

	for (let i = 0; i < rows.length; i++) {
		let cells = rows[i].cells;
		if (cells.length > columnIndex) {
			cells[columnIndex].style.display = "none";
		}
	}
}
function tableHeaders(tableID, array) {
	let table = document.getElementById(tableID);
	let thead = document.createElement("thead");
	table.appendChild(thead);
	for (var i = 0; i < array.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(array[i]));
	}
}
function updateHeaders() {
	// Parse the date strings and create Date objects
	const startDateParts = startDate.split("-");
	const endDateParts = endDate.split("-");

	const displayStartDate = new Date(
		startDateParts[0],
		startDateParts[1] - 1,
		startDateParts[2]
	);
	const displayEndDate = new Date(
		endDateParts[0],
		endDateParts[1] - 1,
		endDateParts[2]
	);
	//checking to ensure this update is right

	// Options for formatting the date
	const options = { year: "numeric", month: "long" };

	// Format the dates
	const formattedStartDate = displayStartDate.toLocaleDateString(
		"en-US",
		options
	);
	const formattedEndDate = displayEndDate.toLocaleDateString(
		"en-US",
		options
	);
	document.getElementById("merchantCard").innerHTML = merchant.name;
	document.getElementById("report_merchant_name").innerHTML =
		"Performance Report - " + merchant.name + ", ID: " + merchant.id;
	document.getElementById("report_timeframe").innerHTML =
		formattedStartDate + " to " + formattedEndDate;
}
function buildQuickStatsTable() {
	console.log("Quick-stats Table");
	console.log(data.monthlyPerformanceSummary[0]);
	document.getElementById("keySales").innerHTML = toUSD(data.totals.Sales);
	document.getElementById("keyNumber_of_Sales").innerHTML =
		data.totals.Number_of_Sales;
	// document.getElementById("keyAd_Impressions").innerHTML =
	// 	data.totals.Ad_Impressions;
	document.getElementById("keyClicks").innerHTML = data.totals.Click_Throughs;
	document.getElementById("keyNewAffs").innerHTML = toUSD(
		data.totals.Total_Spend
	);
	document.getElementById("keyAvg_Sale").innerHTML = toUSD(
		data.totals.Average_Sale_Amount
	);
	document.getElementById("keyConversionRate").innerHTML =
		data.totals.Conversion_Rate + "%";
	console.log("QUICKSTATS DONE");
}
function buildYTDTable() {
	let table = document.getElementById("ytdSummaryReport");
	let thead = document.getElementById("ytdSummaryTHead");
	let summaryHeadersArray = [
		"Month",
		"Revenue - Gross",
		"Orders - Gross",
		"Total Network Spend",
		"Clicks",
		"Impressions",
		"CR",
	];
	for (var i = 0; i < summaryHeadersArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(summaryHeadersArray[i]));
	}
	console.log(data.monthlyPerformanceSummary);
	table.style.textAlign = "right";
	for (var j = 0; j < data.monthlyPerformanceSummary.length; j++) {
		// if (data.monthlyPerformanceSummary[j].Month.endsWith("-Dec")) {
		// 	break; // Stop the loop when December is encountered
		// }
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
			data.monthlyPerformanceSummary[j].Ad_Impressions,
			data.monthlyPerformanceSummary[j].Conversion_Rate + "%",
		]);
	}
}

function buildAffiliateTable(array) {
	let table = document.getElementById("affiliateSummaryReport");
	table.innerHTML = `<thead id="affTableTHead"></thead>`;
	let thead = document.getElementById("affTableTHead");
	let headArray = [
		"Affiliate",
		"Ad Impressions",
		"Clicks",
		"Sales",
		"Orders",
		"Avg Order",
		"Conversion",
	];
	for (var i = 0; i < headArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(headArray[i]));
	}
	function percentNaNCheck(value) {
		if (isNaN(value)) {
			return "N/A";
		} else {
			return (value * 100).toFixed(2) + "%";
		}
	}
	table.style.textAlign = "right";
	console.log("ALERT", report.topAffiliateCount);
	if (array.length < report.topAffiliateCount) {
		report.topAffiliateCount = array.length;
	}
	if (report.topAffiliateCount) {
		for (let i = 0; i < report.topAffiliateCount; i++) {
			console.log(array.length);
			if (array[i].Sales > 0) {
				buildRow(table, i, [
					array[i].Affiliate,
					array[i].Ad_Impressions,
					array[i].Click_Throughs,
					toUSD(array[i].Sales),
					array[i].Number_of_Sales,
					toUSD(array[i].Average_Sale_Amount),
					array[i].Conversion_Rate + "%",
				]);
			}
		}
	}
	console.log("afftable populated");
	affiliateReportButton.disabled = true;
}

function buildSubAffTable(array) {
	let table = document.getElementById("subAffiliateSummaryReport");
	let thead = document.getElementById("subAffTableTHead");
	let headArray = [
		"Sub Affiliate",
		"Total Sales",
		"Total Clicks",
		"Total Spend",
		"Total ROAS",
	];
	for (var i = 0; i < headArray.length; i++) {
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(headArray[i]));
	}
	table.style.textAlign = "right";
	for (let i = 0; i < report.topAffiliateCount; i++) {
		if (array[i].Sales > 0) {
			buildRow(table, i, [
				array[i].Affiliate + " - " + array[i].Sub_Affiliate_Domain,
				toUSD(array[i].Sales),
				array[i].Click_Throughs,
				toUSD(array[i].Total_Commission.toFixed(2)),
				toUSD(array[i].roa.toFixed(2)),
			]);
		}
	}
	affiliateReportButton.disabled = true;
	completeButton(
		"subAffiliate_report_btn",
		"COMPLETED - SubAFfiliate Performance API"
	);
}
