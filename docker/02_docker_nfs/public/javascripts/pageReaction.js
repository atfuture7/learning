// https://api.jquery.com/jQuery.get/

// Reload current page
// If the DB connection is not ready, The entire template 
// should be reprocessed. 
function sendRefresh() {
    location.reload();
}

// show one line of data
function showLine(jsonItem) {
    //alert(JSON.stringify(jsonItem) );
    var newStr = "</br><button onclick=\"deleteId(" + jsonItem.id +");\">Delete</button>" +
        JSON.stringify(jsonItem) ;
    $("#lineList").append(newStr);
}

// show all DB records
function showAll(data) {
    //alert("data back");
    //alert(JSON.stringify(data));

    // Clear all existing data in div
    var itemDiv = document.getElementById("lineList");
    if (itemDiv.hasChildNodes()) {
        //alert(itemDiv.childNodes.length);

        // for while loop, set break point to prevent accident
        let len = itemDiv.childNodes.length; 

        while (itemDiv.childNodes.length > 0 ) {
            itemDiv.removeChild(itemDiv.firstChild);
            len--;
            if (len < -2) {
                alert("counting error");
                break;
            }
        }
    }

    // build each line
    data.forEach(showLine);
}

// send new line to server via POST
function sendNewLine(sid) {
    //alert($("#newLine").val())
    $.post("/idx2", 
        {
            "action": "add",
            "superId": sid,
            "sLine": $("#newLine").val(),
        }).done(showAll);
}

// send delete id to server via POST
function deleteId(id) {
    $.post("/idx2", 
        {
            "action": "del",
            "id": id,
        }).done(showAll);
}

// test dom function
function testContent(){
    alert($("#lineList").html());
    $("#lineList").text($("#newLine").val());
}