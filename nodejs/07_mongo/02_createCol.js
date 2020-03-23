// create db, create collection 
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = "mydb";

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
// MongoClient.connect() may different from previous version, and currently 
// NodeJS is moving toward MongoDB v.4.x, it reminds on console log that 
// 'useUnifiedTopology' is better to have. 
var client = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);


// Callback when collection built 
function dbColCreated(err, collection) {
	assert.equal(null, err);
	
	console.log("Collection created!");
	
	client.close();
}


// Callback when connection built
// 2nd parameter is connection object
// Then Create Collection
function cbMongoConn( err, resClient ) {
	console.log('Connected correctly to server');
	
	client = resClient;
	const db = client.db(dbName);
	db.createCollection('kimetsu', dbColCreated);
	

}

// 20200321 
// ref: http://mongodb.github.io/node-mongodb-native/3.5/api/MongoClient.html
// current nodejs's mongodb apis are at version 3.5.5 
// when reference to https://docs.mongodb.com/manual/ , api version is 4.2
// nodejs's api is not always clear, sometimes reference back/forth is inevitable.
// How the callback funtion should be design is specified on api document. 

