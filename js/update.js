function changeTheme(type) {
	// Changes background image
	get("body").style.backgroundImage = "url('./resources/static/" + type +".png')";
	get("body").style.color = themeChart["font"][type];
	// Changes interface element colors
	for(var i = 0; i < get("pulltab").length; i++) {
		get("pulltab")[i].style.backgroundColor = themeChart["pulltab"][type];
		get("pulltab")[i].style.color = themeChart["font"][type].replace(")",",0)");
		get("pulltab")[i].onmouseover = function() {
			this.style.color = themeChart["font"][type].replace(")",",1)").replace("b","ba");
		}
		get("pulltab")[i].onmouseleave = function() {
			this.style.color = themeChart["font"][type].replace(")",",0)").replace("b","ba");
		}
		get("sidebar")[i].style.backgroundColor = themeChart["sidebar"][type];
	}

	for(var i = 0; i < get("selection").length; i++) {
		get("selection")[i].style.color = themeChart["font"][type];
	}
}

function tableTheme(theme) {
	for(var i = 0;i < elementCount;i++) {
		// Changes background color of each cell
		if (document.getElementsByClassName("periodictable").length != 0) {
			var index = get("periodictable")[info["location"][i]];
			index.style.backgroundColor = getColor(theme, i);

			if(theme == "category") {
				index.childNodes[2].childNodes[0].nodeValue = "";
			} else if(theme ==  "melting" || theme == "boiling") {
				temperatureValue = info[theme][settings["unit"]][i];
				if(temperatureValue != null) {
					index.childNodes[2].childNodes[0].nodeValue = temperatureValue + "°";	
				}

			} else {
				index.childNodes[2].childNodes[0].nodeValue = info[theme][i];
			}		
		}
	}
	try {lastElement.click();} catch(err){} // Last selection still selected when changing themes
}

function keyChange(theme) {
	if (document.getElementById("keylegend") != null) {
		var rowlength = 3;

		document.getElementsByClassName("key")[0].removeChild(document.getElementById("keylegend"));

		var index = choices[1].indexOf(theme);
		// Create Table
		var tbl = document.createElement('table');
		// id for CSS
		tbl.id = "keylegend";
		if(theme == "category") {
 			tbl.style.top = "10%";
 			tbl.style.left = "16.5%";
 		}
	 	for (var i = 0; i < Object.keys(keyColors[index]).length; i+=rowlength) {
	 		var tr = tbl.insertRow();
	 		for (var x = 0; x < rowlength; x++) {
	 			if ((i + x) < Object.keys(keyColors[index]).length) {
		 			var keycolor = tr.insertCell();
			 		keycolor.className = "keycolor";
			 		keycolor.style.backgroundColor = keyColors[index][Object.keys(keyColors[index])[i + x]];

			 		var keyname = tr.insertCell();
			 		keyvalue = document.createTextNode(Object.keys(keyColors[index])[i + x]);
			 		keyname.appendChild(keyvalue);
			 		keyname.className = "keyvalue";
			 	}
	 		}

	 	};
		get("key").appendChild(tbl);
	}
}

function legendChange(theme) {
	var units = [""," pm"," g/mol", " kJ/mol"," kJ/mol", " eV", " g/mL", "", ""];

	// Title
	if (get("tabletitle").length != 0) {
		var index = choices[1].indexOf(theme);
		if (units[index] != "") {
			var end = choicesDisplay[1][index] + " (" + units[index] + " )";
		} else {
			var end = choicesDisplay[1][index];
		}
		get("tabletitle").innerHTML = end;
	}

	if (colorChart[theme].length != 2) {
		get("legendholder").style.display = "none";
	} else {
		get("legendholder").style.display = "";
		var color1 = colorChart[theme][0];
		var color2 = colorChart[theme][1];

		if (theme === "melting" && "boiling") {
			var unit = settings["unit"];
			var newmin = ranges[theme][unit][0];
			var newmax = ranges[theme][unit][1];

			if (unit != "K") {
				unit = "°" + unit;
			}
			newmin = newmin + " " + unit;
			newmax = newmax + " " + unit;


		} else {
			var newmin = ranges[theme][0] + " " + units[index];
			var newmax = ranges[theme][1] + " " + units[index];
		}

		if (get("legend").length != 0) {

			for(var j = 0; j <= 99; j ++) {
					get("legendcell")[j].style.backgroundColor = gradientColor(color1, color2 , j/100);
			}

			get("minlegend").innerHTML = newmin;
			get("maxlegend").innerHTML = newmax;
		}
	}
}