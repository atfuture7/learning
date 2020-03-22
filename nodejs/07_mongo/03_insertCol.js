
const dataRep = require('../../data/dataRepNode');
var data = new dataRep();
const dbName = 'mydb';

const MongoClient = require(data.mongoApi + 'mongodb').MongoClient;
const assert = require('assert');
var conn = MongoClient.connect(data.mongoUrl, {useUnifiedTopology: true}, cbMongoConn);


function cbInsertV2( err, res ) {
	assert.equal(null, err);
	console.log("insert complete");
	conn.close();
}


function cbInsert( err, res ) {
	assert.equal(null, err);
	var db = conn.db(dbName);
	console.log("lv3");

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
						name:'Giyu Tomioka' 
						,style: ["Mist"]
						,breath: { 
							Mist: ["Hanging Sky, Distant Mist", "Eight Layered Mist", "Demisting Blast"
									,"Shifting Flow Slash", "Sea of Clouds and Haze" ]
							}
						}
						,{ 
						name:'Kanao Tsuyuri' 
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

function cbInsertOne( err, res ) {
	assert.equal(null, err);
	var db = conn.db(dbName);
	console.log("lv2");
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

function cbMongoConn(err, resConn) {
	assert.equal(null, err);
	conn = resConn;
	console.log("lv1");
	
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