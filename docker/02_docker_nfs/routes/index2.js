var express = require('express');
var router = express.Router();
var obSqlite = require('mod_story');

// depleted: designed to return Max(id) to confirm 
//          the DB is working. But finally found the 
//          entire page should be reprocessed. 
router.get('/:action', function(req, res, next) {
  let act = req.params["action"];
  if (act == 'refresh') {
    checkDb ();  
    res.json({idMax: obSqlite.iMax} );
  }
  console.log("block w input")
});

// take action according to POST
router.post('/', async function(req, res, next) {
  data = req.body;
  console.log(data)
  if (data.action == "add") {
    // add line
    obSqlite.addLine([data.superId, data.sLine ]);
  } else if ( data.action == "del" ) {
    // delete line
    obSqlite.delLine(data.id)
  }
  
  // query all records
  obSqlite.getAll(cbGetItem, res);
  
});

// Get default page
router.get('/', function(req, res, next) {
  res.render('index2', { title: "Express", iMax: obSqlite.iMax });
});

module.exports = router;

// refresh DB connection
function checkDb () {
  if (obSqlite.iMax < 0 ) {
    obSqlite.setPath('./docker_vol/story.sqlite')
  }
  console.log("do check db")
}

// callback: send DB records to the client
function cbGetItem(res, retArr) {
  console.log(retArr)
  res.json(retArr);
}