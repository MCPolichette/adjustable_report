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
function isNegOrPos(num) {
	let display = "+";
	if (num < 0) {
		display = "";
	}
	return display;
}

function add_borders(table_id, columns) {
	var table = document.getElementById(table_id);
	console.log(table);
	var totalRowCount = table.rows.length - 1;
	console.log(totalRowCount);
	for (i = 1; i < totalRowCount; i++) {
		for (j = 0; j < columns.length; j++) {
			table.rows[i].cells[columns[j]].style.cssText +=
				"border-left-width :5px;  border-style:solid; border-left-color: #cfe2ff";
		}
	}
	for (k = 0; k < columns.length; k++)
		table.tHead.rows[0].cells[columns[k]].style.cssText +=
			"border-left-color :#cfe2ff ; border-left-width: 5px; border-left-style: solid ";
}
