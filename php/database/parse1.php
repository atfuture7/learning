<!-- common var -->
<?php
	$conn = null; //common element: db connection
?>
<!-- includes -->
<?php include '../include/db_conn.php';?>

<!-- start -->
<?php
//$sSQL = "drop table plu;";
//$conn->query($sSQL);
//$sSQL = "create table plu ("
//		." id int auto_increment primary key,"
//		." plu int, "
//		." ename varchar(255),"
//		." cname varchar(255),"
//		." type int"
//		." last_update timestamp);"
//$conn->query($sSQL);

$myfile = fopen("../datafile/detail2.csv", "r") or die("Unable to open file!");


$maxCnt = 500; //infinite loop prevention

$cnt=0;
while (!feof($myfile)) {
	$sProcess = fgets($myfile);
	$arrProcess = explode( ",", $sProcess);
	//echo $sProcess."</br>";
	//var_dump( $arrProcess);
	//echo "</br>";
	
	$sSQL = "insert into plu (plu, ename, cname, type, last_update) "
			." values ("
			.$arrProcess[0]
			.", \"". $arrProcess[1]."\""
			.", \"". $arrProcess[2]."\""
			.", ". $arrProcess[4]
			.", now()"
			.");";
	echo $sSQL."<br/>";
	if ($conn->query($sSQL) === TRUE) {
		//echo "New record created successfully<br>";
	} else {
		echo "Error: " . $sSQL . "<br>" . $conn->error;
	}
	
	$cnt = $cnt +1;
	if ($cnt >=$maxCnt) break;

}

fclose($myfile);


$conn->close();


?>
file exist