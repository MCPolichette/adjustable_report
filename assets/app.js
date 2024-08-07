// global variables
var merchant = {};
var xmlDoc;
var report = {
	hideYoY: true,
	yoyPerformance: [],
	newAffsMonth1: [],
	newAffsMonth2: [],
	newAffsMonth3: [],
	productList: [],
	subAffiliates: [],
	GrowingPerformancebyYoyPercent: [],
	DecliningPerformancebyYoyPercent: [],
	topAffiliateCount: 10,
	itemCount: 10,
	monthArray: [],
	yoyMonthArray: [],
	showMobile: true,
	yoy: false,
};
var startDate = "";
var endDate = "";
var lyStartDate = "";
var lyEndDate = "";
var data = {
	monthlyPerformanceSummary: [],
	notablePerformers: { one: [], two: [], three: [] },
	newAffs: {},
	primaryMonths: [],
	priorMonths: [],
};
function isNumber(value) {
	return typeof value === "number" && isFinite(value);
}
var icons = {
	up: `<i class="fa fa-caret-square-o-up" style="color:green"></i>`,
	down: `<i class="fa fa-caret-square-o-down" style="color:red"></i>`,
};
var today = {};
var primaryMonth = { month: "primary", affiliateReport: [] };
var priorMonth = { month: "prior" };
var viewReportButton = document.getElementById("viewReport");
var affiliateReportButton = document.getElementById("affiliate_report_button");
//General Functions
function toUSD(dollarInt) {
	var formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	dollarUSD = formatter.format(dollarInt);
	return dollarUSD;
}
function hideRow(rowId, btnId) {
	let row = document.getElementById(rowId);
	let btn = document.getElementById(btnId);
	if (row.hidden) {
		btn.innerHTML = "Hide the Display Below";
		row.hidden = false;
	} else {
		btn.innerHTML = "Show Hidden Row";
		row.hidden = true;
	}
}
// !!CREATE BUTTON SCRIPT FILE
function removeDisabledButton(id) {
	let btn = document.getElementById(id);
	btn.disabled = false;
	btn.classList = "btn btn-success";
}
function loadButton(id) {
	document.getElementById("first_loading_bar").hidden = false;
	let btn = document.getElementById(id);
	btn.disabled = true;
	btn.classList = "btn btn-outline.primary";
	btn.innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
}
function addNote() {
	let noteTitle = document.getElementById("manualTitleText").value;
	let noteContent = document.getElementById("manualNotesText").value;
	let noteSection = document.getElementById("notesDiv");
	noteContent = noteContent.replace(/\r?\n/g, "<br />");
	let note = `<h5>` + noteTitle + `</h5><p>` + noteContent + `</p>`;
	noteSection.insertAdjacentHTML("afterend", note);
	noteTitle = "";
	noteContent = "";
}
function completeButton(id, newText) {
	document.getElementById("first_loading_bar").hidden = true;
	let btn = document.getElementById(id);
	btn.disabled = true;
	btn.innerHTML = newText;
}
function hide(arr) {
	//Reveals a hidden HTML element.
	arr.forEach((id) => {
		let element = document.getElementById(id);
		element.hidden = true;
	});
}
function unhide(arr) {
	//Reveals a hidden HTML element.
	arr.forEach((id) => {
		let element = document.getElementById(id);
		console.log(element);
		if (element.hidden) {
			element.removeAttribute("hidden");
		}
	});
}
function updateDivArray(array, text) {
	for (let i = 0; i < array.length; i++) {
		document.getElementById(array[i]).innerHTML = text;
	}
}

function use_local_storage() {
	let x = window.localStorage.test;
	document.getElementById("password_input").value = x;
	console.log("used local storage to populate API key");
}
function password_check() {
	API_KEY = document.getElementById("password_input").value;
	switch (API_KEY.length) {
		case 32:
			window.localStorage.setItem("test", API_KEY);
			unhide(["monthlyReport", "report_display"]);
			hide(["title"]);
			document.getElementById("first_display").remove();
			break;
		default:
			alert("This key is an unacceptable value");
			break;
	}
}
function getMerchantLogo() {
	let logoURL = "https://static.avantlink.com/merchant-logos/" + merchant.id;
	if (merchant.id != "23437") {
		logoURL += ".png"; // Appends the file extension
	}
	return logoURL;
}
function perfomance_report() {
	loadButton("submitBtn");
	var acceptableData = true;
	const startMonth = document.getElementById("startMonth").value;
	const endMonth = document.getElementById("endMonth").value;
	console.log(startMonth, endMonth);
	merchant.id = document.getElementById("merchant_ID_input").value;
	document.getElementById("merchant_logo").src = getMerchantLogo();
	document.getElementById("merchantCardMonth1").innerHTML = startMonth;
	document.getElementById("merchantCardMonth2").innerHTML = endMonth;
	document.getElementById("merchantCardId").innerHTML = "ID: " + merchant.id;
	if (document.getElementById("yoyReport").checked) {
		console.log("YOY REPORT");
		report.yoy = true;
		document.getElementById("merchantCardReportType").innerHTML =
			"YOY REPORT";
	} else {
		report.yoy = false;
	}
	// SETTING DATES W/ updated selector

	if (!startMonth || !endMonth) {
		alert("Please select both start and end month/year.");
		return;
	}
	startDate = startMonth + "-01";
	endDate = getLastDayOfMonth(endMonth);
	lyStartDate = getLyStart(startMonth);
	lyEndDate = getLastYearEndDate(endMonth);
	console.log(endDate);
	console.log(startDate);
	console.log("PRIOR YEAR DATES : " + lyStartDate + lyEndDate);
	const today = new Date();
	today.setHours(0, 0, 0, 0); // Reset to midnight for accurate comparison
	const startOfNextMonth = new Date(
		today.getFullYear(),
		today.getMonth() + 1,
		1
	);

	// Validation: End date must not be before start date
	if (endDate < startDate) {
		alert("End date cannot be before start date.");
		acceptableData = false;
		return;
	}

	// Validation: Start date must not be in the future
	if (startDate > today) {
		alert("Start date cannot be in the future.");
		acceptableData = false;
		return;
	}

	// Validation: End date must not be beyond the current month
	if (new Date(endMonth + "-01") >= startOfNextMonth) {
		alert("End date cannot be beyond the current month.");
		acceptableData = false;
		return;
	}

	if (acceptableData === true) {
		if (report.yoy) {
			runAPI({
				type: "yoy",
				report_id: 48,
				startDate: startDate,
				endDate: endDate,
			});
		} else {
			runAPI({
				type: "standard",
				report_id: 48,
				startDate: startDate,
				endDate: endDate,
			});
		}
	}
}
//THESE  SCRIPTS REQUIRE NO EDITS:
function affiliate_report() {
	document.getElementById("first_loading_bar").hidden = false;
	document.getElementById(
		"affiliate_report_button"
	).innerHTML = `<div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
	runAPI({
		report_id: 15,
		startDate: startDate,
		endDate: endDate,
		month: "primary",
	});
}
function products_sold_report() {
	document.getElementById("first_loading_bar").hidden = false;
	runAPI({
		report_id: 18,
		startDate: startDate,
		endDate: endDate,
		month: "primary",
	});
}
function subAffiliate_report() {
	document.getElementById("subAffiliate_report_btn").disabled = true;
	document.getElementById("first_loading_bar").hidden = false;
	runAPI({
		report_id: 96,
		startDate: startDate,
		endDate: endDate,
		month: "primary",
	});
}
function runDailyChart() {
	runAPI({
		report_id: 12,
		startDate: primaryMonth.startDate,
		endDate: primaryMonth.endDate,
		month: "next",
	});
}
