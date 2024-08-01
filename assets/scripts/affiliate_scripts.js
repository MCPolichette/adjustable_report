function displayNewAffiliates(array, id) {
	document.getElementById(id).innerHTML = "";
	for (j = 0; j < array.length; j++) {
		let affiliateButton = document.createElement("button");
		let x = array[j];
		affiliateButton.innerHTML = x;
		affiliateButton.classList = "btn btn-primary";
		affiliateButton.addEventListener(
			"click",
			function () {
				let y = array.indexOf(x);
				console.log(j, x, y, array[j]);
				array.splice(y, 1);
				displayNewAffiliates(array, id);
			},
			false,
			false
		);
		document.getElementById(id).appendChild(affiliateButton);
	}
}
function addAffiliate(affiliate, array, id, clearId) {
	if (array.includes(affiliate)) {
		alert("already added this Affiliate");
	} else {
		console.log(affiliate, array);
		for (i = 0; i < primaryMonth.affiliateReport.length; i++) {
			console.log(primaryMonth.affiliateReport[i].Affiliate_Id, i);
			if (affiliate === primaryMonth.affiliateReport[i].Affiliate_Id) {
				array.push(affiliate);
				console.log(affiliate, array, id);
				displayNewAffiliates(array, id, affiliate);
			}
		}
	}
	document.getElementById(clearId).value = "";
}
function addNotableAffiliate(ID, row) {
	console.log(ID, row);
	if (document.getElementById(ID).checked) {
		switch (row) {
			case 1:
				data.notablePerformers.one.push(ID);
				break;
			case 2:
				data.notablePerformers.two.push(ID);
				break;
			case 3:
				data.notablePerformers.three.push(ID);
				break;
		}
	} else {
		let x = 0;
		switch (row) {
			case 1:
				x = data.notablePerformers.one.indexOf(ID);
				data.notablePerformers.one.splice(x);
				break;
			case 2:
				x = data.notablePerformers.two.indexOf(ID);
				data.notablePerformers.two.splice(x);
				break;
			case 3:
				x = data.notablePerformers.three.indexOf(ID);
				data.notablePerformers.three.splice(x);
				break;
		}
	}
	console.log(data.notablePerformers);
}
function updateNotablePerformers() {
	var el = document.getElementById("newAffCol");
	el.classList.remove("col-6");
	el.classList.add("col-12");
	if (data.notablePerformers.one.length > 0) {
		let notableTable1 = document.getElementById("notableTable1");
		let notableThead1 = document.getElementById("notableThead1");
		notableTable1.appendChild(notableThead1);
		notableThead1
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Affiliate"));
		notableThead1
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Sales"));
		notableThead1
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Number Of Sales"));
		notableThead1
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Conversion Rate"));
		console.log("ATTENTION");
		console.log(data.notablePerformers.one.length);

		for (l = 0; l < data.notablePerformers.one.length; l++) {
			for (m = 0; m < primaryMonth.affiliateReport.length; m++) {
				console.log(
					data.notablePerformers.one[l],
					primaryMonth.affiliateReport[m].Affiliate_Id
				);
				if (
					data.notablePerformers.one[l] ==
					primaryMonth.affiliateReport[m].Affiliate_Id
				) {
					buildRow(notableTable1, l, [
						primaryMonth.affiliateReport[m].Affiliate,
						primaryMonth.affiliateReport[m].Sales,
						primaryMonth.affiliateReport[m].Number_of_Sales,
						primaryMonth.affiliateReport[m].Conversion_Rate,
					]);
				}
			}
		}
	}

	if (data.notablePerformers.two.length > 0) {
		let notableTable2 = document.getElementById("notableTable2");
		let notableThead2 = document.getElementById("notableThead2");
		notableTable2.appendChild(notableThead2);
		notableThead2
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Affiliate"));
		notableThead2
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Sales"));
		notableThead2
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Number Of Sales"));
		notableThead2
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Conversion Rate"));
		console.log("ATTENTION");
		console.log(data.notablePerformers.two.length);

		for (n = 0; n < data.notablePerformers.two.length; n++) {
			for (o = 0; o < primaryMonth.affiliateReport.length; o++) {
				console.log(
					data.notablePerformers.two[n],
					primaryMonth.affiliateReport[o].Affiliate_Id
				);
				if (
					data.notablePerformers.two[n] ==
					primaryMonth.affiliateReport[o].Affiliate_Id
				) {
					buildRow(notableTable2, n, [
						primaryMonth.affiliateReport[o].Affiliate,
						primaryMonth.affiliateReport[o].Sales,
						primaryMonth.affiliateReport[o].Number_of_Sales,
						primaryMonth.affiliateReport[o].Conversion_Rate,
					]);
				}
			}
		}
	}

	if (data.notablePerformers.three.length > 0) {
		let notableTable3 = document.getElementById("notableTable3");
		let notableThead3 = document.getElementById("notableThead3");
		notableTable3.appendChild(notableThead3);
		notableThead3
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Affiliate"));
		notableThead3
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Sales"));
		notableThead3
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Number Of Sales"));
		notableThead3
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode("Conversion Rate"));
		console.log("ATTENTION");
		console.log(data.notablePerformers.three.length);

		for (p = 0; p < data.notablePerformers.three.length; p++) {
			for (q = 0; q < primaryMonth.affiliateReport.length; q++) {
				if (
					data.notablePerformers.three[p] ==
					primaryMonth.affiliateReport[q].Affiliate_Id
				) {
					buildRow(notableTable3, p, [
						primaryMonth.affiliateReport[q].Affiliate,
						primaryMonth.affiliateReport[q].Sales,
						primaryMonth.affiliateReport[q].Number_of_Sales,
						primaryMonth.affiliateReport[q].Conversion_Rate,
					]);
				}
			}
		}
	}
}

function buildNewPerformersTable(y1, y2, y3) {
	let table = document.getElementById("newPartnerReport");
	let tHead = document.getElementById("newPartnerPerformanceTitle");
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Month"));
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("New Partners"));
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Performance This Month"));
	tHead
		.appendChild(document.createElement("th"))
		.appendChild(document.createTextNode("Notable Performers"));
	let notablePerformersTable = document.getElementById("notablePerformers");
	table.style.textAlign = "right";
	let NotablePerformers = [];
	let month1Total = 0;
	let month2Total = 0;
	let month3Total = 0;
	let nextRow = 1;
	var newObject = {};
	notableRows = [];
	console.log(report.newAffsMonth1.length);
	document.getElementById("keyNewAffs").innerHTML =
		report.newAffsMonth1.length;
	console.log(primaryMonth.affiliateReport.length);
	for (i = 0; i < report.newAffsMonth1.length; i++) {
		for (j = 0; j < primaryMonth.affiliateReport.length; j++) {
			if (
				report.newAffsMonth1[i] ===
				primaryMonth.affiliateReport[j].Affiliate_Id
			) {
				let arr1 = [
					primaryMonth.affiliateReport[j].Affiliate,
					primaryMonth.affiliateReport[j].Sales,
					primaryMonth.affiliateReport[j].Number_of_Sales,
					primaryMonth.affiliateReport[j].Conversion_Rate,
				];
				month1Total =
					month1Total + primaryMonth.affiliateReport[j].Sales;
				NotablePerformers.push(arr1);
				newObject[primaryMonth.affiliateReport[j].Affiliate_ID] = [];
				console.log(newObject);
				notableRows.push([
					data.month,
					primaryMonth.affiliateReport[j].Affiliate,
					toUSD(primaryMonth.affiliateReport[j].Sales),
					primaryMonth.affiliateReport[j].Number_of_Sales,
					primaryMonth.affiliateReport[j].Conversion_Rate,
					`<div class="form-check form-switch"><input class="form-check-input" onchange='addNotableAffiliate(` +
						[primaryMonth.affiliateReport[j].Affiliate_Id, 1] +
						`)' type="checkbox" id="` +
						primaryMonth.affiliateReport[j].Affiliate_Id +
						`"></div>`,
				]);
			}
		}
	}

	buildRow(table, 0, [
		data.month,
		report.newAffsMonth2.length,
		toUSD(month1Total),
		`<table class="table table-striped centered table-sm" id="notableTable1"><tbody style="font-size: small">
		<thead id="notableThead1"></thead>
		</tbody></table>`,
	]);
	for (k = 0; k < report.newAffsMonth2.length; k++) {
		for (l = 0; l < primaryMonth.affiliateReport.length; l++) {
			if (
				report.newAffsMonth2[k] ===
				primaryMonth.affiliateReport[l].Affiliate_Id
			) {
				let arr2 = [
					primaryMonth.affiliateReport[l].Affiliate,
					primaryMonth.affiliateReport[l].Sales,
					primaryMonth.affiliateReport[l].Number_of_Sales,
					primaryMonth.affiliateReport[l].Conversion_Rate,
				];
				month2Total =
					month2Total + primaryMonth.affiliateReport[l].Sales;
				console.log(month2Total);
				NotablePerformers.push(arr2);
				notableRows.push([
					data.previousMonth,
					primaryMonth.affiliateReport[l].Affiliate,
					toUSD(primaryMonth.affiliateReport[l].Sales),
					primaryMonth.affiliateReport[l].Number_of_Sales,
					primaryMonth.affiliateReport[l].Conversion_Rate,
					`<div class="form-check form-switch">
  						<input class="form-check-input" onchange='addNotableAffiliate(` +
						[primaryMonth.affiliateReport[l].Affiliate_Id, 2] +
						`)' type="checkbox" id="` +
						primaryMonth.affiliateReport[l].Affiliate_Id +
						`"></div>`,
				]);
			}
		}
	}
	buildRow(table, 1, [
		data.previousMonth,
		report.newAffsMonth3.length,
		toUSD(month2Total),
		`<table class="table table-striped centered table-sm" id="notableTable2"><tbody style="font-size: small">
			<thead id="notableThead2"></thead>
			</tbody></table>`,
	]);
	for (m = 0; m < report.newAffsMonth3.length; m++) {
		for (n = 0; n < primaryMonth.affiliateReport.length; n++) {
			if (
				report.newAffsMonth3[m] ===
				primaryMonth.affiliateReport[n].Affiliate_Id
			) {
				let arr3 = [
					primaryMonth.affiliateReport[n].Affiliate,
					primaryMonth.affiliateReport[n].Sales,
					primaryMonth.affiliateReport[n].Number_of_Sales,
					primaryMonth.affiliateReport[n].Conversion_Rate,
				];
				month3Total =
					month3Total + primaryMonth.affiliateReport[n].Sales;
				NotablePerformers.push(arr3);
				notableRows.push([
					data.twoMonthsAgo,
					primaryMonth.affiliateReport[n].Affiliate,
					toUSD(primaryMonth.affiliateReport[n].Sales),
					primaryMonth.affiliateReport[n].Number_of_Sales,
					primaryMonth.affiliateReport[n].Conversion_Rate,
					`<div class="form-check form-switch">
  						<input class="form-check-input" onchange='addNotableAffiliate(` +
						[primaryMonth.affiliateReport[n].Affiliate_Id, 3] +
						`)' type="checkbox" id="` +
						primaryMonth.affiliateReport[n].Affiliate_Id +
						`"></div>`,
				]);
			}
		}
	}
	console.log(notableRows);
	for (z = 0; z < notableRows.length; z++) {
		buildRow(notablePerformersTable, z + 1, notableRows[z]);
	}
	buildRow(table, 2, [
		data.twoMonthsAgo,
		report.newAffsMonth3.length,
		toUSD(month3Total),
		`<table class="table table-striped centered table-sm" id="notableTable3"><tbody style="font-size: small">
			<thead id="notableThead3"></thead>
			</tbody></table>`,
	]);
	removeDisabledButton("addNotablesBtn");

	let tablex = document.getElementById("quickStats");
	buildRow(tablex, 0, ["New Affiliates", report.newAffsMonth2.length]);
}
function updateTopPerformers() {
	let content = document.getElementById("updateTopPerformers").value;
	let num = Number(content);
	if (isNumber(num)) {
		if (num > primaryMonth.affiliateReport.length) {
			alert(
				"the selected number is Larger than the amount of active Affiliates for this Merchant"
			);
		} else {
			report.topAffiliateCount = num;
			buildAffiliateTable(primaryMonth.affiliateReport);
		}
	} else {
		alert("Please use a Numerical Value");
	}
}
