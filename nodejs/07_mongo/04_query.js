
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = 'mydb';

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
var conn = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);

function cbQueryV2(err, resDoc) {
	assert.equal(null, err);
	console.log("lv3");
	console.log(resDoc);
	conn.close();

}

function cbQuery(err, resDoc) {
	assert.equal(null, err);
	console.log("lv2");
	for (var i=0; i<resDoc.length; i++) {
		console.log(resDoc[i].name);
		console.log(resDoc[i].style);
		console.log(resDoc[i].breath.Water);
	}
	
	var db = conn.db(dbName);
	var objQuery = { style: /F/} ;
	db.collection('kimetsu').find( objQuery ).toArray( cbQueryV2 );
}

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