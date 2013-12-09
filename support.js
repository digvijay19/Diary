var operations = {};
fs = readFileSync('fs');

operations.getYearDetails = function(year){
	var fileName = './years/'+year;
	var data = fs.readFileSync(fileName,'utf-8') || {};
	return JSON.parse(data);
}
exports.operations = operations;