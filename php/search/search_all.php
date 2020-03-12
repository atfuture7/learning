<!-- common var -->
<?php
	$conn = null; //common element: db connection
?>
<!-- includes -->
<?php include '../include/db_conn.php';?>


<!-- start -->
<?php
	$sType = "";
	$maxCnt = 500; 							//infinite loop prevention
	$aColor= array("#DDEEFF","#BBFFCC"); 	//used to differentiate types
	//echo(mb_internal_encoding ());
?>
<html>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<meta id="Viewport" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

	<script src="../include/viewport.js"></script>
	<body>
<?php

	$sSQL = "select plu.plu, plu.ename, plu.cname, plu_type.cname "
			." from plu "
			." inner join plu_type on plu.type = plu_type.id"
			." order by plu.type, plu.plu, last_update;"
			;
	echo $sSQL;
	$result = mysqli_query($conn, $sSQL);


	if (mysqli_num_rows($result) > 0) {
		//$row = mysqli_fetch_row($result);
		//var_dump( $row);
		$cnt = 0;
		$cColor=1;
?>
		<table>

<?php	
	
		// output data of each row
		while($row = mysqli_fetch_row($result)) {
			if ($sType != $row[3]) {
				$sType = $row[3];
				$cColor = ($cColor +1)%2;
			}
?>
			<tr bgcolor="<?=$aColor[$cColor]; ?>">
				<td><?=$row[0];?></td>
				<td><?=$row[1];?></td>
				<td><?=$row[2];?></td>
				<td><?=$row[3];?></td>
			</tr>		
<?php
			if ($cnt++ > $maxCnt) break;
			
		}
?>
		</table>	

<?php

	} else {
		echo "0 results";
	}
?>
	</body>
</html>

<?php

	$conn->close();

?>

