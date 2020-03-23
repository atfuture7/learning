// insert data 
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = 'mydb';

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
var conn = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);

// Final callback, close connection 
function cbInsertV2( err, res ) {
	assert.equal(null, err);
	console.log("insert complete");
	conn.close();
}

// Callback of 1st insertMany()
// use insertMany() insert many records. match its name. 
function cbInsert( err, res ) {
	assert.equal(null, err);
	var db = conn.db(dbName);
	console.log("lv3- insertMany, multiple");

	let objInsert = [
						{ 
						name:'Zenitsu Agatsuma' 
						,style: ["Thunder"]
						,breath: { 
							Thunder: ["Thunderclap and Flash", "Rice Spirit", "Thunder Swarm"
									,"Distant Thunder", "Heat Lightning" ]
							}
						}
						,{ 
						name:'Inosuke Hashibira' 
						,style: ["Beast"]
						,breath: { 
							Beast: ["Pierce", "Rip and Tear", "Devour"
									,"Slice N Diceh", "Crazy Cutting" ]
							}
						}
						,{ 
						name:'Muichiro Tokito' 
						,style: ["Mist"]
						,breath: { 
							Mist: ["Hanging Sky, Distant Mist", "Eight Layered Mist", "Demisting Blast"
									,"Shifting Flow Slash", "Sea of Clouds and Haze" ]
							}
						}
						,{ 
						name:'Giyu Tomioka' 
						,style: ["Water"]
						,breath: { 
							Water: ["Water Surface Slash", "Water Wheel", "Flowing Dance"
									,"Striking Tide", "Blessed Rain After the Drought" ]
							}
						}
						,{ 
						name:'Kyojuro Rengoku' 
						,style: ["Flames"]
						,breath: { 
							Flames: ["Unknowing Fire", "Rising Scorching Sun", "Blooming Flame Undulation"
									,"Flame Tiger", "Rengoku" ]
							}
						}
					];
	db.collection('kimetsu').insertMany( objInsert, cbInsertV2) ;
}

// Callback of insertOne()
// Then use insertMany() to insert ONE record 
// usually I don't care system information res.
// if there is nothing wrong with data 
function cbInsertOne( err, res ) {
	assert.equal(null, err);
	console.log("lv2- insertOne() complete");
	var db = conn.db(dbName);
	let objInsert = [{ 
						name:'Kanao Tsuyuri' 
						,style: ["Flower"]
						,breath: { 
							Flower: ["Honorable Shadow Plum", "Crimson Hanagoromo", "Peonies of Futility"
									,"Whirling Peach", "Equinoctial Vermilion Eye" ]
							}
						}
					];
	db.collection('kimetsu').insertMany( objInsert, cbInsert) ;
}

// callback of connection()
// and then use insertOne() 
function cbMongoConn(err, resConn) {
	assert.equal(null, err);
	conn = resConn;
	console.log("lv1- connection built!");
	
	var db = conn.db(dbName);
	let objInsert = { 
						name:'Tanjiro Kamado'
						,style: ["Water", "FireGod", "Sun"]
						,breath: { 
							Water: ["Water Surface Slash", "Water Wheel", "Flowing Dance"
									,"Striking Tide", "Blessed Rain After the Drought" ]
							,FireGod: ["Flash Dance", "Clear Blue Sky", "Raging Sun"
									, "Fake Rainbow", "Fire Wheel"]
							}
					};
	db.collection('kimetsu').insertOne( objInsert, cbInsertOne );
}

// 20200321 Insert data 
// This is not the ideal structure. But I have to design a complecated structure 
// for further testing. There are string object, array object and nested structure. 
// Tutorials usually provides simple key-value structure. But it's useless in my 
// work. I need complicated structure, and I must be able to manipulate it.