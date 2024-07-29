function applyIcon(num) {
	let icon = icons.up;
	if (num < 0) {
		icon = icons.down;
	}
	return icon;
}
function applyPercent(num) {
	let display = num.toFixed(2) + "%";
	return display;
}
function isNeg(num) {
	let display = "+";
	if (display < 0) {
		display = "-";
	}
	return display;
}

// REFERENCE:
// function dollarRowValues(text, m1, m2, x) {
// 	let icon = icons.up;
// 	let posOrNeg = "+";
// 	let value = m1 - m2;
// 	let percent;
// 	if (value < 0) {
// 		icon = icons.down;
// 		posOrNeg = "";
// 		percent = "-" + (((m2 - m1) / m2) * 100).toFixed(2);
// 	} else {
// 		percent = (((m1 - m2) / m2) * 100).toFixed(2);
// 	}
// 	console.log(percent, value, icon);
// 	return [text, toUSD(m1), toUSD(value), posOrNeg + percent + "%", icon];
// }
