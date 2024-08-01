function build_products_sold_table() {
	console.log("Building Products Sold Function");
	let table = document.getElementById("productsSoldReport");
	let thead = document.getElementById("productTHead");
	let headArray = [
		"Products SKU",
		"Product Name",
		"Total Sales count ",
		"Mobile Sales Count",
		"Total Sales Amount",
	];
	for (var j = 0; j < headArray.length; j++) {
		console.log(j);
		thead
			.appendChild(document.createElement("th"))
			.appendChild(document.createTextNode(headArray[j]));
	}
	// table.style.textAlign = "right";
	for (let i = 0; i < report.productList.length; i++) {
		console.log(i);
		buildRow(
			table,
			[i],
			[
				report.productList[i].Product_SKU,
				report.productList[i].Product_Name,
				report.productList[i].Sale_Count,
				report.productList[i].Mobile_Sale_Count,
				report.productList[i].Total_Product_Sale_Amount,
			]
		);
	}
}
