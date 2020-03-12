<!-- common var -->
<?php
	$conn = null; //common element: db connection
?>
<!-- includes -->
<?php include '../include/db_conn.php';?>


<!-- start -->
<?php
	$sType = "";
	$maxCnt = 500;
?>
<html>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<meta id="Viewport" name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">

	<script src="../include/viewport.js"></script>
	<script>
		// verify if item code exists. save time for input.
		function load_plu(id, ename, cname, type) {
			var formA = document.getElementById("form_plu");
			formA.PLU.value = id;
			formA.ename.value = ename;
			formA.cname.value = cname;
			//alert("start");
			var options = formA.ptype.options;
			var cnt=0;
			//alert(type);
			for (cnt=0; cnt< formA.ptype.length; cnt++) {
				//alert(options[cnt].value);
				if (options[cnt].value == type) {
					formA.ptype.selectedIndex = cnt;
					break;
				}
			}
		}
	</script>
	<body>
		<a href="../tindex.php">回首頁</a>
<?php
	// preparation for type selection

	$sSQL = "select id, cname"
			." from plu_type"
			;
	//echo($sSQL."</br>");
	$result = mysqli_query($conn, $sSQL);
	$sOption="";

	if (mysqli_num_rows($result) > 0) {
		while($row = mysqli_fetch_row($result)) {
			$sOption.= "\t\t\t\t <option value=\"".$row[0]."\">"
						.$row[1]
						."</option>\n"
						;
		}

	} else {
		echo "0 results";
	}	
	
?>
		<form action="update1.php" method="get" id="form_plu">
			<table border>
				<tr>
					<td>
						PLU: <input type="text" name="PLU" />
						<input type="submit" name="load" value="load" />
					</td>
					<td>
						name: <input type="text" name="ename" />
					</td>
				<tr>
				<tr>
					<td></td>
					<td>
						中文名: <input type="text" name="cname" />
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						分類：<select name="ptype"><?=$sOption?></select>
					</td>
				</tr>
				<tr>
					<td>
						<input type="submit" name="delete" value="delete" />
					</td>
					<td>
						<input type="submit" name="submit" value="update" />
					</td>
				</tr>
			</table>
		</form>

	
	
<?php
	//process input values
	
	if ( isset( $_GET['PLU'] ) ) {
		$sMsg="";
		
		
		if ( isset( $_GET['delete'] ) ) {
			// delete 
			$sSQL = "delete from plu where plu=".$_GET['PLU'];
			mysqli_query($conn, $sSQL);
			$sMsg = "delete plu ".$_GET['PLU'];
		} elseif ( isset( $_GET['load'] ) ) {
			// load
			$sSQL = "select id, ename, cname, type from plu where plu=".$_GET['PLU'];
			$result = mysqli_query($conn, $sSQL);
			if (mysqli_num_rows($result) > 0) {
				$row = mysqli_fetch_row($result);
				$sScrupt = "<script>load_plu(".$_GET['PLU'].",'".$row[1]."','".$row[2]."',".$row[3]." );</script>";
			}
			mysqli_query($conn, $sSQL);
			echo($sScrupt);
			$sMsg = "load plu ".$_GET['PLU'];
		} else {
			// create / update
			$sSQL = "select id from plu where plu = ".$_GET['PLU'];
			$result = mysqli_query($conn, $sSQL);
			$sMsg .= $sSQL;
			if (mysqli_num_rows($result) > 0) {
				$iVerify=0;
				while($row = mysqli_fetch_row($result)) {
					if ($iVerify >0) {
						//delete all the rest repetition
						$sSQL = "delete from plu where id = ".$row[0];
						$sMsg .= $sSQL;
						mysqli_query($conn, $sSQL);
					} else {
						// update
						$sSQL = "update plu set "
								." ename = '".$_GET['ename']."' "
								.", cname = '".$_GET['cname']."' "
								.", type = ".$_GET['ptype']
								." where plu = ".$_GET['PLU'];
						$sMsg .= $sSQL;
						mysqli_query($conn, $sSQL);
						$iVerify++; 
					}
				}
			} else {
				// insert
				$sSQL = "insert into plu (plu, ename, cname, type, last_update) "
						." values ("
						.$_GET['PLU']
						.", '".$_GET['ename']."'"
						.", '".$_GET['cname']."'"
						.", ".$_GET['ptype']
						.", now() )";
				$sMsg .= $sSQL;
				mysqli_query($conn, $sSQL);
			}
		}
		echo $sMsg;
	}
?>
	</body>
</html>

<?php

	$conn->close();

?>

