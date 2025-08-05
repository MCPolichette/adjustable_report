function monthFormat(input) {
	const [year, month] = input.split("-");
	return `${month} \n${year}`;
}
function buildIndividualyoytables() {
	console.log("building tables for yoy monthly displays");
	hide(["ytdSummaryReport"]);
	let dispRow = document.getElementById("yoyLayoutDisplays");
	console.log(report.monthArray);
	let thisStep = {
		monthArray: report.monthArray.reverse(),
		lyMonthArray: report.lyMonthArray.reverse(),
	};
	for (i = 0; i < thisStep.monthArray.length; i++) {
		console.log(i);
		var newCol = document.createElement("div");
		newCol.className = "col-6"; // Add Bootstrap column class for a 6-grid column
		// Create a new table
		var table = document.createElement("table");

		// Create a table header
		var thead = document.createElement("thead");
		table.appendChild(thead);

		table.className = "table"; // Add Bootstrap table class
		let headersArray = [
			" ",
			monthFormat(thisStep.monthArray[i].Month),
			monthFormat(thisStep.lyMonthArray[i].Month),
			"% Change",
			"",
			"Nominal \nChange",
		];

		for (var j = 0; j < headersArray.length; j++) {
			thead
				.appendChild(document.createElement("th"))
				.appendChild(document.createTextNode(headersArray[j]));
		}

		// Create a table body
		var tbody = document.createElement("tbody");
		console.log(i);
		buildRow(
			table,
			0,
			otherRowValues(
				"Conversion Rate",
				thisStep.monthArray[i].Conversion_Rate,
				thisStep.lyMonthArray[i].Conversion_Rate
			)
		);
		buildRow(
			table,
			0,
			dollarRowValues(
				"Avg\n Sale Amount",
				thisStep.monthArray[i].Average_Sale_Amount,
				thisStep.lyMonthArray[i].Average_Sale_Amount
			)
		);
		buildRow(
			table,
			0,
			otherRowValues(
				"# of Sales",
				thisStep.monthArray[i].Number_of_Sales,
				thisStep.lyMonthArray[i].Number_of_Sales
			)
		);
		buildRow(
			table,
			0,
			dollarRowValues(
				"Sales",
				thisStep.monthArray[i].Sales,
				thisStep.lyMonthArray[i].Sales
			)
		);
		buildRow(
			table,
			0,
			otherRowValues(
				"Click Throughs",
				thisStep.monthArray[i].Click_Throughs,
				thisStep.lyMonthArray[i].Click_Throughs
			)
		);

		table.appendChild(tbody);
		// Append the table to the new column
		newCol.appendChild(table);
		table.className = "table table-striped text-end table-sm";
		dispRow.appendChild(newCol);
		//page breaks every 8 tables.
		// Add page break at 8 and then every 10th table after 8
		if (i === 8 || (i > 8 && (i - 8) % 10 === 0)) {
			newCol.classList.add("page-break");
		}
		if (i === thisStep.monthArray.length) {
			if (
				(i >= 0 && i <= 3) ||
				(i >= 8 && i <= 14) ||
				(i >= 18 && i <= 24) ||
				(i >= 28 && i <= 34)
			) {
				console.log("removing last pagebreak");
				document
					.getElementById("graphicDisplay")
					.classList.remove("page-break");
			}
		}
	}
}

function dollarRowValues(text, m1, m2, x) {
	let icon = icons.up;
	let posOrNeg = "+";
	let value = m1 - m2;
	let percent;
	if (m2 === 0) {
		return [text, toUSD(m1), 0, 0, " ", posOrNeg + m1];
	} else if (value < 0) {
		icon = icons.down;
		posOrNeg = "";
		percent = "-" + (((m2 - m1) / m2) * 100).toFixed(2);
	} else {
		percent = (((m1 - m2) / m2) * 100).toFixed(2);
	}
	value = value.toFixed(2);
	return [
		text,
		toUSD(m1),
		toUSD(m2),
		posOrNeg + percent + "%",
		icon,
		posOrNeg + value,
	];
}
function otherRowValues(text, m1, m2, x) {
	let icon = icons.up;
	let posOrNeg = "+";
	let value = m1 - m2;
	let percent;
	if (m2 === 0) {
		return [text, toUSD(m1), 0, 0, " ", posOrNeg + m1];
	} else if (value < 0) {
		icon = icons.down;
		posOrNeg = "";
		percent = "-" + (((m2 - m1) / m2) * 100).toFixed(2);
	} else {
		percent = (((m1 - m2) / m2) * 100).toFixed(2);
	}
	value = value.toFixed(2);
	if (text === "Conversion Rate") {
		m1 = m1 + "%";
		value + "%";
	}
	return [text, m1, m2, posOrNeg + percent + "%", icon, posOrNeg + value];
}
