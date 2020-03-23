// sort, update, delete, drop 
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = 'mydb';

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
var conn = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);

//------ Tool ----
// Build a query finction
// The entire process is built as step-by-step tour;  usually modify 
// functions don't provide information I care about  (they return system
// messages), I need simple query to check  result. Even so, steps still
// need to go forward instead of reusing the  previous callback functions
// which may cause ifinite loop.
function genCbSimpleQuery( objQuery, cb) {
	var db = conn.db(dbName);
	db.collection('kimetsu').find( objQuery ).toArray( cb );
}


//-----Main flow -----

// callback of listCollections() 
// show collection list
// close connection
function cbQueryV9(err, resDoc) {
	assert.equal(null, err);
	console.log("lv6-2 collection list");
	console.log(resDoc);
	conn.close();
	
}

// callback of deleteMany 
// query collection list
function cbQuery8(err, resDoc) {
	assert.equal(null, err);
	console.log("lv6-1 -drop collection");
	var db = conn.db(dbName);
	db.listCollections().toArray(cbQueryV9);
	//https://docs.mongodb.com/manual/reference/command/listCollections/
}

// callback of query after deleteMany
// show update result
// then call drop() collection
function cbQueryV7(err, resDoc) {
	assert.equal(null, err);
	console.log("lv5-2 -show result");
	console.log(resDoc);
	var db = conn.db(dbName);
	var objQuery = { style : /er/ } ;
	db.collection('kimetsu').drop( {} ,cbQuery8 );
	
}

// callback of deleteMany 
// query for the result
function cbQueryV6(err, resDoc) {
	assert.equal(null, err);
	console.log("lv5-1 -deleteMany ");
	genCbSimpleQuery( {}, cbQueryV7)
	
}

// callback of query after update-$unset 
// show update result
// then call deleteMany() 
function cbQueryV5(err, resDoc) {
	assert.equal(null, err);
	console.log("lv4-2 -show result");
	console.log(resDoc);
	var db = conn.db(dbName);
	var objQuery = { style : /er/ } ;
	db.collection('kimetsu').deleteMany( objQuery, {} ,cbQueryV6 );
	
}

// callback of update-$unset 
// query for the result
function cbQueryV4(err, resDoc) {
	assert.equal(null, err);
	console.log("lv4-1 -update $unset");

	var objQuery = { name : "Inosuke Hashibira" } ;
	genCbSimpleQuery( objQuery, cbQueryV5)
}

// callback of query after update-$set 
// show update result
// then call update-$unset, $unset take 1 as remove. 
// $set and $unset couldn't be combined into one option object. 
function cbQueryV3(err, resDoc) {
	assert.equal(null, err);
	console.log("lv3-2 -show result");
	for (var i=0; i<resDoc.length; i++) {
		console.log(resDoc[i].name);
		console.log(resDoc[i].style);
		console.log(resDoc[i].breath);
	}
	var db = conn.db(dbName);
	var objQuery = { name : "Inosuke Hashibira" } ;
	var objSet = { $unset:{"style":0, "breath":0}};
	db.collection('kimetsu').updateMany( objQuery, objSet, {} ,cbQueryV4 );
}

// callback of update-$set 
// query for the result
function cbQueryV2(err, resDoc) {
	assert.equal(null, err);
	console.log("lv3-1 -update $add");
	var objQuery = { name : "Inosuke Hashibira" } ;
	genCbSimpleQuery( objQuery, cbQueryV3)
}


// callback of query-sort 
// then call updateMany()
// use $set to set string, add nested array, add member:song
function cbQuery(err, resDoc) {
	assert.equal(null, err);
	console.log("lv2- show sorted data");
	console.log(resDoc);
	
	var db = conn.db(dbName);
	var objQuery = { name : "Inosuke Hashibira" } ;
	var objSet = { $set:{ style:"beauty", "breath.rock":["tough", "final chapter" ], song:"dark knight" }};
	db.collection('kimetsu').updateMany( objQuery, objSet, {} ,cbQueryV2 );
}

// callback of connect 
// and then do query-sort 
// sort() takes 1 as ascend, -1 as descend 
// project() takes 1 as selected, 0 as removed
function cbMongoConn(err, resConn) {
	assert.equal(null, err);
	conn = resConn;
	console.log("lv1- connection success");
	
	var db = conn.db(dbName);
	var objQuery = {} ;
	var objSort = {name:1, style:-1};
	var retField = {name:1, style:1} ;
	db.collection('kimetsu').find( objQuery ).sort(objSort).project(retField).toArray( cbQuery );
}

// 20200322 sort, update, delete, drop 
// for update, there are 3 oprions, I used $set and $unset 
// $set and $unset couldn't combine together. (yes, I tried to)
// mongodb probably don't care how deep the nest is when deletes a key...
// then test delete and drop functions. 