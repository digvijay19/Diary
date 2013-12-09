var fs = require('fs');

var year = getTodaysDate()[0];
var month = getTodaysDate()[1];
var date = getTodaysDate()[2];

var details = getYearDetails(year);

function getTodaysDate(){
	var date = new Date().toJSON();
	return date.split('T')[0].split('-');
}

function getYearDetails(year){
	var fileName = './years/'+year;
	var data = fs.existsSync(fileName) && fs.readFileSync(fileName,'utf-8') || '{}';
	return JSON.parse(data);
}

function defineYearIfNotPresent(){
	if(!details[year])	details = getYearDetails(year);
	details[year][month] || (details[year][month] = {});
	details[year][month][date] || (details[year][month][date]  = {});
}

function setYearMonthDate(){
	var fullDate = document.getElementById("date").value;
	fullDate = fullDate.split('-');
	year = fullDate[0];
	month = fullDate[1];
	date = fullDate[2];
}

function setDetails(){
	setYearMonthDate();

	defineYearIfNotPresent();
	
	document.getElementById("location").value = details[year][month][date]['location'] || "";
	document.getElementById("topic").value = details[year][month][date]['topic'] || "";
	document.getElementById("story").value = details[year][month][date]['story'] || "";
}

function saveDetails(){
	setYearMonthDate();
	
	defineYearIfNotPresent();

	details[year][month][date]['location'] = document.getElementById("location").value;
	details[year][month][date]['topic'] = document.getElementById("topic").value;
	details[year][month][date]['story'] = document.getElementById("story").value;

	var fileName = './years/'+year;
	fs.writeFile(fileName,JSON.stringify(details));
}

function loadDiary(){
	document.getElementById("date").value = getTodaysDate().join('-');
	setDetails();
}
function nextDay(){
	date++;
	document.getElementById("date").value = year+'-'+month+'-'+date;
	setDetails();
}
function previousDay(){
	date--;
	document.getElementById("date").value = year+'-'+month+'-'+date;
	setDetails();
}