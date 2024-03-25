/**
 * SQLite handler 
 * note: SQLite does not obtain the query immediately and does not wait for the results to be returned.
 *      The fix I made was to store the user handle and trigger a callback when the database query completes.
 * concern: function getAll()
 *          It uses 'let tempRes' to store user-handler. The call bask will send DB data to the user via 
 *          this handler. But I can't guerentee if this variable is a instance for each call. Not able to 
 *          debug if the testing samples are not large enough to break the query queue. 
 */
const sqlite3 = require('sqlite3').verbose();

/**
 * storyObj: 
 * manage table: story
 */
class storyObj {
    iMax = -1;

    // Connet to DB file
    setPath(path) {
        this.savepath = path;
        this.db = new sqlite3.Database(path);
        // if nfs is on Windows, check if the new folder is read only. 
        console.log('Connected to the sqlite database.');

        // It takes time to get Max(id). 
        // query and store at the very begining
        this.getMaxId();
    }

    // close DB file. 
    clostDb(){
        this.db.close((err) =>{
            if (err) {
                console.log('Close the database error.');
                throw err;
                }
            });
        console.log('Close the database connection.');
    }

    // Create table: story
    createTable() {
        var sql = "create table IF NOT EXISTS story (\
            id int,\
            superId int,\
            sLine text)";
        console.log(sql);
        this.db.run(sql, [], (err)=> {
            if (err) {
                console.error(err.message);
            }
            return 0;
            });
        console.log('Create table.');
    }

    // Get Max id
    // Due to the design of SQLite, query result can not be obtained immediatly
    async getMaxId(){
        var sql = 'SELECT MAX(id) FROM story';
        this.db.get(sql, [], (err, row) => {
            if (err) {
                console.error(err.message);
                return 0; 
                }
            console.log(row);
            var aName = Object.keys(row);
            this.iMax= ((row[aName[0]] == null)? 0: row[aName[0]]);
            console.log("iMax: "+ this.iMax);
            })
    } 

    // Add one record
    addLine(aData){
        //aData = [superId, sLine] 
        var iMax = this.iMax;
        this.iMax += 1;
        var sql = "insert into story (id, superId, sLine)"
                + " values (" + (iMax+1) + ", " + aData[0] + ", '" +aData[1] + "')";
        console.log(sql);
        this.db.run(sql, [], (err)=> {
            if (err) {
                console.log(err);
                throw err;
                }
            });
        console.log('add line.');
    }

    // Delete by ID
    delLine(id){
        var sql = "delete from story where id=" +id;
        console.log(sql);
        this.db.run(sql, [], (err)=> {
            if (err) {
                console.log(err);
                throw err;
                }
            });
        console.log('delete line.');
    }

    // test function
    methodLog() {
        console.log("something to work on")
    }

    // Get all data
    // Using callbask to process the result. 
    // Doesn't return anything from this function
    // params: cb : callback( user-response, data-array)
    getAll(cb, res) {
        var sql = "select * from story";
        var retArr = [];
        let tempRes = res;
        this.db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
                }
            rows.forEach((row) => {
                //console.log(row);
                retArr.push(row);
                });
            cb(tempRes, retArr);
            });
    }


}

// create and return storyObject 
function storyTool () {
    const oStory = new storyObj();
    return oStory;
}

exports.storyTool = storyTool;
