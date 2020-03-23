// query records 
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = 'mydb';

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
var conn = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);

// callback of find function 
// this shows only selected columns (+ _id)
function cbQueryV2(err, resDoc) {
	assert.equal(null, err);
	console.log("lv3");
	console.log(resDoc);
	conn.close();

}

// callback of find function 
// and then make a query that search for an array. It's similar to 
// search a string. 
// project() function decide to or not to return specific columns. 
// Columns could be defined by multiple set. 1 is selected. -1 is 
// removed. -1 is especially useful on keyname _id. _id is a uniqe 
// number in records, returned  with query result by default. _id 
// could also be set at insert functions
function cbQuery(err, resDoc) {
	assert.equal(null, err);
	console.log("lv2");
	for (var i=0; i<resDoc.length; i++) {
		console.log(resDoc[i].name);
		console.log(resDoc[i].style);
		console.log(resDoc[i].breath.Water);
	}
	
	var db = conn.db(dbName);
	var objQuery = { style: /F/ } ;
	var retField = { "name":1, "style":1 } 
	db.collection('kimetsu').find( objQuery ).project(retField).toArray( cbQueryV2 );
	//https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/
}

// callback of connection
// then make a query based on the nested object 
// if the key-name is one word, quote("") is omitable
// if it is nested key, the key-name combination should be quoted. 
function cbMongoConn(err, resConn) {
	assert.equal(null, err);
	conn = resConn;
	console.log("lv1");
	
	var db = conn.db(dbName);
	var objQuery = { "breath.Water": /Wheel/} ;
	
	// api: commandCursor collection.find()
	// api: commandCursor.toArray(callBack)
	db.collection('kimetsu').find( objQuery ).toArray( cbQuery );
}

// 20200321 query records 
// query might be difficult under nested structure, though not impossible. 
// if the key could be spelled out, a programmer can creates his/her own 
// nested query. 
// find() is the main query function, it returns a cursor. 
// toArray() function does the decipher and return data to callback
// not only "find()" return a cursor, or "toArray()" holds the cursor,
// sort(), project() also attach to a cursor. 
// project() defined which column to or not to return. 