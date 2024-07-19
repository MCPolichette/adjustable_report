function removeYearFromDate(dateString) {
	var parts = dateString.split("/");
	var month = parts[0];
	var day = parts[1];
	return month + "/" + day;
}

function DateToString(date) {
	let options = {
		// weekday: "short", //to display the full name of the day, you can use short to indicate an abbreviation of the day
		day: "numeric",
		month: "long", //to display the full name of the month
		year: "numeric",
	};
	var sDay = date.toLocaleDateString("en-US", options);
	return sDay;
}
function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function getLastDayOfMonth(yearMonth) {
	const [year, month] = yearMonth.split("-").map(Number);

	// Create a date for the first day of the next month
	const date = new Date(year, month, 0);

	// Get the last day of the month in YYYY-MM-DD format
	const yearStr = date.getFullYear();
	const monthStr = String(date.getMonth() + 1).padStart(2, "0");
	const dayStr = String(date.getDate()).padStart(2, "0");

	return `${yearStr}-${monthStr}-${dayStr}`;
}
