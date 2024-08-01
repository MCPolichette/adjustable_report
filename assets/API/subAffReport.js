function subaffData(xml) {
	console.log(xml);
	let subAffiliates = [];
	xmlDoc = xml.getElementsByTagName("Table1");
	console.log(xmlDoc.length);
	console.log(xmlDoc[0].getElementsByTagName("Sub_Affiliate_Domain")[0]);
	for (let i = 0; i < xmlDoc.length; i++) {
		let isSub = "";
		if (
			xmlDoc[i].getElementsByTagName("Sub_Affiliate_Domain")[0]
				.childNodes[0] &&
			xmlDoc[i].getElementsByTagName("Sub_Affiliate_Domain")[0]
				.childNodes[0].nodeValue
		) {
			isSub = xmlDoc[i].getElementsByTagName("Sub_Affiliate_Domain")[0]
				.childNodes[0].nodeValue;
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
				xmlDoc[i].getElementsByTagName("Affiliate_Id")[0].childNodes[0]
					.nodeValue,
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
	return subAffiliates;
}
