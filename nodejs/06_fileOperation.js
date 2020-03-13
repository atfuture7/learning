// file create/append/delete/rename

var fs = require('fs');

// function: create series filename 
function getFileName(idx) {
	return '../data/06_file' + idx + '.txt';
}

// function: shift forward 1 by rename, and delete the file with max id.
function shiftFile( max) {
	var fname ="";
	for (var idx = max; idx > 0; idx--) {
		fname = getFileName(idx);
		if ( fs.existsSync(fname)) {
			if (idx == max) {
				//delete file
				fs.unlink( fname, function( err) {
					if (err) throw err;
					console.log('delete '+ fname);
				});
			} else {
				//rename file
				var fnameNew = getFileName(idx+1 );
				fs.rename( fname, fnameNew, function( err) {
					if (err) throw err;
					console.log(fname +' renamed to '+ fnameNew);
				});
			}
		} else {
			console.log(fname + 'not exists');
		}

	}
}

// file1: new, file2: update append, file3: update overwrite
var idx = 1;
var str = "";
var fname = getFileName(idx++);
shiftFile(3);

//file1 is empty
fs.open(fname, 'w', function (err, file) {
	if (err) throw err;
	console.log("create new");
});

str = Date() + 'add something to new file.\n';
fs.appendFile( fname, str, function (err) {
	if (err) throw err;
	console.log('add to new!');
});

//file 2 append 
fname = getFileName(idx++);
str = Date() + 'append content\n';
fs.appendFile( fname, str, function (err) {
	if (err) throw err;
	console.log('append!');
});

//file3 overwrite
fname = getFileName(idx++);
str = Date() +'write over';
fs.writeFile( fname, str, function (err) {
	if (err) throw err;
	console.log('replaced!');
});

// 0312 exercise https://www.w3schools.com/nodejs/nodejs_filesystem.asp
// redesign
// practice file operations 
// shift file names to show the difference. 
// notice: log message of the same variable is not always correct. (or only show the latest value.) 