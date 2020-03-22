// ref: http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = "mydb";

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
var client = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);

function dbColCreated(err, collection) {
	assert.equal(null, err);
	
	console.log("Collection created!");
	
	client.close();
}

function cbMongoConn( err, resClient ) {
	console.log('Connected correctly to server');
	
	client = resClient;
	const db = client.db(dbName);
	db.createCollection('kimetsu', dbColCreated);
	

}


