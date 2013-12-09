var fs = require('fs');

var data = fs.readFileSync("./public/data",'utf-8') || "{}";
var details = JSON.parse(data);

function getTodaysDate(){
	var date = new Date();
	return date.getDate() +"-"+(date.getMonth()+1) +"-"+ date.getFullYear();
}

function createDateIfNotPresent(year,month,date){
	details[year][month] || (details[year][month] = {})
	details[year][month][date] || (details[year][month][date] = {})
}
function setDetails(date){
	document.getElementById("date").value = date;
	var fullDate = date.split("-");
	var year = fullDate[2];
	var month = fullDate[1];
	var date = fullDate[0];

	createDateIfNotPresent(year,month,date);

	document.getElementById("location").value = details[year][month][date]["location"] || "";
	document.getElementById("dayStory").value = details[year][month][date]["dayStory"] || "";
}
function saveDetails(){
	var date = document.getElementById("date").value;
	var fullDate = date.split("-");
	var year = fullDate[2];
	var month = fullDate[1];
	var date = fullDate[0];

	createDateIfNotPresent(year,month,date);

	details[year][month][date]["location"] = document.getElementById("location").value;
	details[year][month][date]["dayStory"] = document.getElementById("dayStory").value;
	fs.writeFile("./public/data",JSON.stringify(details));
}
function previousDay(){
	date = document.getElementById("date").value;
	var fullDate = date.split("-");
	if(+fullDate[0]-1 == 0){
		fullDate[0] = 31;
		if(fullDate[1]-1 == 0){
			fullDate[1] = 12;
			fullDate[2] -= 1; 
		}
		else
			fullDate[1] -= 1;
	}
	else
		fullDate[0] = +fullDate[0]-1;
	setDetails(fullDate.join('-'));
}
function nextDay(){
	date = document.getElementById("date").value;
	var fullDate = date.split("-");
	fullDate[0] = +fullDate[0]+1;
	setDetails(fullDate.join('-'));
}
function loadDiary(){
	var date = getTodaysDate();
	setDetails(date);
}
function save(){
	saveDetails();
}