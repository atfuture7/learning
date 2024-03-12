/* 
* simple example of nodejs module.
* Uses mongoose to manage mongoDB collections.
* In the low-restriction environment of mongoDB, 
* the schema ensures that necessary fields are checked.
*/ 

/* 
 * Module dependencies.
 */ 
var mongoose = require("mongoose");

/* 
 * collection schema
 */
const bookschema = new mongoose.Schema({
    bookname: {
        type: String,
        required:true
    }, 
    issuedate: {
        type: Date,
        required: true
    },
    author: {
        type: String
    }
})

/* 
 * The class used to handle the collection's document.
 */
class booksh {

    /* 
     * constructor
     */
    booksh() {
        this.log = "run constructor";
        console.log(this.log);
        this.log = "work";
    }

    /* 
     * get log
     */
    getmsg() {
        return this.log;
    }

    /* 
     * set schema
     * Putting it in the constructor seems unreliable.
     */
    setSchema( schema ) {
        this.schema = schema
    }

    /* 
     * CURD: c: create a book
     */
    addBook(book, cdate, AName) {
        
        console.log("add data:" + book)

        this.nBook = new this.schema({
            bookname: book,
            issuedate: cdate,
            author: AName
        });
        
        this.nBook.save().then(()=>{
            this.log = "book added";
        }).catch((err)=>{
            this.log = err;
        });

        return this.log;
    }

    /* 
     * CURD: r: read all record
     */
    getBooks() {
        let result = this.schema.find();
        this.log = "read all";
        return result;

    }

    /* 
     * CURD: r: read by id
     */
    getBookById(id) {
        let result = this.schema.findById(id);
        this.log = "read by _ID";
        return result;

    }

    /* 
     * tool: build JSON string
     */
    appendField(str, fName, val) {
        var ret = str.concat( '"', fName, '": "', val,  '"') ; 
        return ret;
    }

    /* 
     * CURD: u: update by id
     */
    updateBook(id, book, cdate, AName) {
        
        this.log = "update data:" + id + ", " + book + ", " + cdate + ", " + AName ;
        //console.log(this.log);
        if (id == undefined) return;
        var upStr = this.appendField("{", "_id", id); 
        if (book != undefined) {
            upStr = this.appendField(upStr + ", ", "bookname", book); 
        }
        if (cdate != undefined) {
            upStr = this.appendField(upStr + ", ", "issuedate", cdate); 
        }
        if (AName != undefined) {
            upStr = this.appendField(upStr + ", ", "author", AName); 
        }
        upStr = upStr + "}";
        var ob = JSON.parse(upStr); 
        console.log(ob);

        this.schema.findByIdAndUpdate(id, ob).then(()=>{
            this.log = "book update" ;
        }).catch((err)=>{
            this.log = err;
        });

        return this.log;
    }    

    /* 
     * CURD: d: delete by id
     */
    deleteBookById(id) {
        this.schema.findByIdAndDelete(id ).then(()=>{
            this.log = "book deleted";
        }).catch((err)=>{
            this.log = err ;
        });
        return this.log;

    }
    
}

/* 
 * initialize module 
 */
function init( ){
    var newMgr = new booksh(); 
    newMgr.setSchema( mongoose.model("Book", bookschema) );
    return newMgr;
}

exports.init = init;

