function runAPI(report) {
	startDate = report.startDate;
	endDate = report.endDate;
	report_id = report.report_id;
	let network = "";
	switch (getSelectedValue()) {
		case "CA":
			console.log("CA");
			network = "&filter_network=CA";
			break;
		case "US":
			console.log("US");

			break;
		case "AU":
			console.log("AU");
			network = "&filter_network=AU";
			break;
		case "null":
			alert("no network selected");
	}
	console.log("API DETAILS", report);
	fetch(
		"https://classic.avantlink.com/api.php?module=AdminReport&auth_key=" +
			API_KEY +
			"&merchant_id=" +
			merchant.id +
			"&merchant_parent_id=0&affiliate_id=0&website_id=0&date_begin=" +
			startDate +
			"&date_end=" +
			endDate +
			"&affiliate_group_id=0&report_id=" +
			report_id +
			"&output=xml" +
			network
	)
		.then((response) => response.text())
		.then(
			(str) =>
				(xmlDoc = new window.DOMParser().parseFromString(
					str,
					"text/xml"
				))
		)
		.then((data) =>
			// console.log(data)
			reportStep2(data, report_id, startDate, endDate)
		);
}
function getSelectedValue() {
	var radios = document.getElementsByName("networkRadio");

	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			var selectedValue = radios[i].value;
			console.log("Selected Account Type:", selectedValue);
			return selectedValue;
		}
	}
	// Handle case when no radio button is selected
	console.log("No Account Type selected");
	return null;
}
function reportStep2(xml, report_id) {
	console.log("API STEP 2:", report_id, startDate, endDate);
	switch (report_id) {
		case 96:
			console.log(xml);
			let subAffiliates = [];
			xmlDoc = xml.getElementsByTagName("Table1");
			console.log(xmlDoc.length);
			console.log(
				xmlDoc[0].getElementsByTagName("Sub_Affiliate_Domain")[0]
			);
			for (let i = 0; i < xmlDoc.length; i++) {
				let isSub = "";
				if (
					xmlDoc[i].getElementsByTagName("Sub_Affiliate_Domain")[0]
						.childNodes[0] &&
					xmlDoc[i].getElementsByTagName("Sub_Affiliate_Domain")[0]
						.childNodes[0].nodeValue
				) {
					isSub = xmlDoc[i].getElementsByTagName(
						"Sub_Affiliate_Domain"
					)[0].childNodes[0].nodeValue;
				}
				subAffiliates.push({
					Affiliate:
						xmlDoc[i].getElementsByTagName("Affiliate_Name")[0]
							.childNodes[0].nodeValue,
					Click_Throughs: Number(
						xmlDoc[i]
							.getElementsByTagName("Click_Throughs")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Affiliate_Id:
						xmlDoc[i].getElementsByTagName("Affiliate_Id")[0]
							.childNodes[0].nodeValue,
					Number_of_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Number_of_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Commissions: Number(
						xmlDoc[i]
							.getElementsByTagName("Commissions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Network_Commissions: Number(
						xmlDoc[i]
							.getElementsByTagName("Network_Commissions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Sub_Affiliate_Domain: isSub,
					Incentives: Number(
						xmlDoc[i]
							.getElementsByTagName("Incentives")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Conversion_Rate: Number(
						xmlDoc[i]
							.getElementsByTagName("Conversion_Rate")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("%", "")
					),
					New_Customers: Number(
						xmlDoc[i]
							.getElementsByTagName("New_Customers")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					New_Customer_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("New_Customer_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Mobile_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Mobile_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Number_of_Mobile_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Number_of_Mobile_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
				});
				subAffiliates[i].Total_Commission =
					subAffiliates[i].Commissions +
					subAffiliates[i].Network_Commissions +
					subAffiliates[i].Incentives;
				subAffiliates[i].roa =
					subAffiliates[i].Sales / subAffiliates[i].Total_Commission;
			}
			subAffiliates.sort(function (a, b) {
				return b.Sales - a.Sales;
			});
			console.log(subAffiliates);
			report.subAffiliates = subAffiliates;
			buildSubAffTable(report.subAffiliates);
			break;
		case 48:
			let monthCount = xmlDoc.getElementsByTagName("Month").length;
			console.log(monthCount);
			for (i = 0; i < monthCount; i++) {
				let m = {};
				m.Month =
					xmlDoc.getElementsByTagName("Month")[
						i
					].childNodes[0].nodeValue;
				m.Ad_Impressions = Number(
					xmlDoc
						.getElementsByTagName("Ad_Impressions")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Click_Throughs = Number(
					xmlDoc
						.getElementsByTagName("Click_Throughs")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Sales = Number(
					xmlDoc
						.getElementsByTagName("Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Number_of_Sales = Number(
					xmlDoc
						.getElementsByTagName("Number_of_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Mobile_Sales = Number(
					xmlDoc
						.getElementsByTagName("Mobile_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Number_of_Mobile_Sales = Number(
					xmlDoc
						.getElementsByTagName("Number_of_Mobile_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Commissions = Number(
					xmlDoc
						.getElementsByTagName("Commissions")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Incentives = Number(
					xmlDoc
						.getElementsByTagName("Incentives")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Network_Commissions = Number(
					xmlDoc
						.getElementsByTagName("Network_Commissions")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Number_of_Adjustments = Number(
					xmlDoc
						.getElementsByTagName("Number_of_Adjustments")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Conversion_Rate = Number(
					xmlDoc
						.getElementsByTagName("Conversion_Rate")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("%", "")
				);
				m.New_Customers = Number(
					xmlDoc
						.getElementsByTagName("New_Customers")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.New_Customer_Sales = Number(
					xmlDoc
						.getElementsByTagName("New_Customer_Sales")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Average_Sale_Amount = Number(
					xmlDoc
						.getElementsByTagName("Average_Sale_Amount")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				m.Click_Through_Rate = Number(
					xmlDoc
						.getElementsByTagName("Click_Through_Rate")
						[i].childNodes[0].nodeValue.replaceAll(",", "")
						.replaceAll("$", "")
				);
				data.monthlyPerformanceSummary.push(m);
			}
			console.log(data);
			runAPI({
				report_id: 1,
				startDate: startDate,
				endDate: endDate,
			});
			console.log(data.monthlyPerformanceSummary);
			report.monthArray = data.monthlyPerformanceSummary;
			buildYTDTable();
			drawSalesVConversionChart(
				"Monthly Sales and Conversions",
				"monthlyPerformanceGraph",
				"test"
			);

			break;
		case 18:
			console.log(xmlDoc.getElementsByTagName("Product_SKU").length);
			if (
				xmlDoc.getElementsByTagName("Product_SKU").length <
				report.itemCount
			) {
				report.itemCount =
					xmlDoc.getElementsByTagName("Product_SKU").length;
			}
			for (let i = 0; i < report.itemCount; i++) {
				let x = {};
				console.log(report.itemCount + " expected items");
				x.Product_SKU =
					xmlDoc.getElementsByTagName("Product_SKU")[i].textContent;
				x.Product_Name =
					xmlDoc.getElementsByTagName("Product_Name")[i].textContent;
				x.Sale_Count =
					xmlDoc.getElementsByTagName("Sale_Count")[i].textContent;
				x.Mobile_Sale_Count =
					xmlDoc.getElementsByTagName("Mobile_Sale_Count")[
						i
					].textContent;
				x.Total_Product_Sale_Amount = xmlDoc.getElementsByTagName(
					"Total_Product_Sale_Amount"
				)[i].textContent;
				if (x.Product_Name === "") {
					x.Product_Name = "Product name not specified";
				}
				report.productList[i] = x;
				console.log(x);
			}
			build_products_sold_table();
			// removeDisabledButton("select_affiliates_btn");
			completeButton(
				"product_report_btn",
				"COMPLETED - Products Sold API"
			);

			break;
		// case 12:
		// MAY COME BACK TO THIS> MAY RUN IN THE SCENARIO WHERE ONLY ONE MONTH IS SELECTED
		// 	let days = xmlDoc.getElementsByTagName("Sales").length;
		// 	console.log(days);
		// 	let dailyArr = [["Day", "Sales", "Conversion Rate"]];
		// 	let secondArr = [["Day", "Number of Sales", "Conversion Rate"]];
		// 	for (let i = 0; i < days; i++) {
		// 		dailyArr.push([
		// 			removeYearFromDate(
		// 				xmlDoc.getElementsByTagName("Date")[i].textContent
		// 			),
		// 			Number(
		// 				xmlDoc
		// 					.getElementsByTagName("Sales")
		// 					[i].innerHTML.replaceAll(",", "")
		// 					.replaceAll("$", "")
		// 			),
		// 			Number(
		// 				xmlDoc
		// 					.getElementsByTagName("Conversion_Rate")
		// 					[i].innerHTML.replaceAll("%", "")
		// 			) / 100,
		// 		]);
		// 		secondArr.push([
		// 			removeYearFromDate(
		// 				xmlDoc.getElementsByTagName("Date")[i].textContent
		// 			),
		// 			Number(
		// 				xmlDoc
		// 					.getElementsByTagName("Number_of_Sales")
		// 					[i].innerHTML.replaceAll(",", "")
		// 					.replaceAll("$", "")
		// 			),
		// 			Number(
		// 				xmlDoc
		// 					.getElementsByTagName("Conversion_Rate")
		// 					[i].innerHTML.replaceAll("%", "")
		// 			) / 100,
		// 		]);
		// 	}
		// 	console.log(dailyArr);
		// 	data.SaleNumPerformance = secondArr;
		// 	data.dailyPerformance = dailyArr;
		// 	drawDailySalesVConversionChart(
		// 		"Daily Sales and Conversions",
		// 		"dailyPerformanceGraph",
		// 		"sales"
		// 	);
		// 	break;
		case 1: //Performance Summary
			console.log(xml);
			merchant.name =
				xmlDoc.getElementsByTagName(
					"Merchant"
				)[0].childNodes[0].nodeValue;
			// ------------------
			let totals = {};

			totals.Ad_Impressions = Number(
				xmlDoc
					.getElementsByTagName("Ad_Impressions")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Click_Throughs = Number(
				xmlDoc
					.getElementsByTagName("Click_Throughs")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Sales = Number(
				xmlDoc
					.getElementsByTagName("Sales")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Number_of_Sales = Number(
				xmlDoc
					.getElementsByTagName("Number_of_Sales")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Mobile_Sales = Number(
				xmlDoc
					.getElementsByTagName("Mobile_Sales")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Number_of_Mobile_Sales = Number(
				xmlDoc
					.getElementsByTagName("Number_of_Mobile_Sales")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Commissions = Number(
				xmlDoc
					.getElementsByTagName("Commissions")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Incentives = Number(
				xmlDoc
					.getElementsByTagName("Incentives")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Network_Commissions = Number(
				xmlDoc
					.getElementsByTagName("Network_Commissions")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Number_of_Adjustments = Number(
				xmlDoc
					.getElementsByTagName("Number_of_Adjustments")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Conversion_Rate = Number(
				xmlDoc
					.getElementsByTagName("Conversion_Rate")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("%", "")
			);
			totals.New_Customers = Number(
				xmlDoc
					.getElementsByTagName("New_Customers")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.New_Customer_Sales = Number(
				xmlDoc
					.getElementsByTagName("New_Customer_Sales")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Average_Sale_Amount = Number(
				xmlDoc
					.getElementsByTagName("Average_Sale_Amount")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Click_Through_Rate = Number(
				xmlDoc
					.getElementsByTagName("Click_Through_Rate")[0]
					.childNodes[0].nodeValue.replaceAll(",", "")
					.replaceAll("$", "")
			);
			totals.Total_Spend =
				totals.Incentives +
				totals.Commissions +
				totals.Network_Commissions;

			data.totals = totals;
			console.log(data);
			// -------------------
			updateHeaders();
			completeButton("submitBtn", "Merchant & Date Selected");
			removeDisabledButton("affiliate_report_button");
			// removeDisabledButton("viewReport");
			console.log("end performance setting");
			break;
		case 15: //Performance Summary by Affiliate for selected dates
			let affiliates = [];
			xmlDoc = xml.getElementsByTagName("Table1");
			console.log(xmlDoc.length);
			console.log(xml);
			for (let i = 0; i < xmlDoc.length; i++) {
				affiliates.push({
					Affiliate:
						xmlDoc[i].getElementsByTagName("Affiliate")[0]
							.childNodes[0].nodeValue,
					Click_Throughs: Number(
						xmlDoc[i]
							.getElementsByTagName("Click_Throughs")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Affiliate_Id:
						xmlDoc[i].getElementsByTagName("Affiliate_Id")[0]
							.childNodes[0].nodeValue,
					Number_of_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Number_of_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Commissions: Number(
						xmlDoc[i]
							.getElementsByTagName("Commissions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Network_Commissions: Number(
						xmlDoc[i]
							.getElementsByTagName("Network_Commissions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Ad_Impressions: Number(
						xmlDoc[i]
							.getElementsByTagName("Ad_Impressions")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Incentives: Number(
						xmlDoc[i]
							.getElementsByTagName("Incentives")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Conversion_Rate: Number(
						xmlDoc[i]
							.getElementsByTagName("Conversion_Rate")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("%", "")
					),
					New_Customers: Number(
						xmlDoc[i]
							.getElementsByTagName("New_Customers")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					New_Customer_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("New_Customer_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Mobile_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Mobile_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Number_of_Mobile_Sales: Number(
						xmlDoc[i]
							.getElementsByTagName("Number_of_Mobile_Sales")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
					Average_Sale_Amount: Number(
						xmlDoc[i]
							.getElementsByTagName("Average_Sale_Amount")[0]
							.childNodes[0].nodeValue.replaceAll(",", "")
							.replaceAll("$", "")
					),
				});
				affiliates[i].Total_Commission =
					affiliates[i].Commissions +
					affiliates[i].Network_Commissions +
					affiliates[i].Incentives;
				affiliates[i].roa = Number(
					affiliates[i].Sales /
						affiliates[i].Total_Commission.toFixed(2)
				);
			}
			affiliates.sort((a, b) => b.Sales - a.Sales);
			let topTen = [];
			let lessThanTen = 10;
			console.log(affiliates.length);
			if (affiliates.length < 10) {
				lessThanTen === affiliates.length;
			}
			console.log("building tables");
			buildAffiliateTable(affiliates);
			console.log("affreport done");
			buildQuickStatsTable();
			removeDisabledButton("product_report_btn");
			completeButton(
				"affiliate_report_button",
				"COMPLETED - Affiliate Performance API"
			);
			removeDisabledButton("subAffiliate_report_btn");

			break;
	}
}
