<?php
	declare(strict_types=1);
	// 20200416 stated
?>

<html>
	<head>
		<title>Get familiar with PHP 7</title>
	</head>
	<body bgcolor=#dfefe7>
		<h2> Strict input/output - function</h2>
		
		declare(strict_types=1); </br>
		
		function sum(int ...$iValues): int {} </br></br>
		
		input int/null and return a int. <br><br>
		
		<?php

			function sum (int ...$iValues): int {
				return array_sum($iValues);
			}
			
			print("Input none:".sum()."</br>");
			print("Input one:".sum(7)."</br>");
			print("Input many:".sum(1,2,3,5,7)."</br>");
		?>   
		<hr>
		
		<h2>Null coalescing operator (??) </h2>
		$final = $check ?? 'default value';<br><br>
		Original version: $final = isset($check) ? 'default value';<br><br>
		Formal version: <br>
		if ( isset($check)) $final = $check;<br>
		else $final = 'default value';<br><br>
		
		<?php
			$check = null;
			print("null: ".($check ?? 'default value')."</br>");
			$check = 'Happy';
			print("Happy: ".($check ?? 'default value')."</br>");
			unset($check);
			$check2 = 'Cake';
			print("Chained: null, cake: ".($check ?? $check2 ??'default value')."</br>");
		?>
		<hr>
		
		<h2>Spaceship Operator (<=>) </h2>
		$evaluate = ($val1 <=> $val2);<br><br>
		$evaluate = <br>
		-1: $val1 &lt; $val2 ;<br>
		 0: $val1 = $val2 ;<br>
		+1: $val1 &gt; $val2 ;<br><br>
		
		<?php
			print("5,8: ".( 5 <=> 8 )."<br>");
			print("A,chr(0x65): ".( 'A' <=> chr(0x41) )."<br>");
			print("noodle, monkey : ".( 'noodle'<=> 'monkey'  )."<br>");
		?>
		<hr>
		
		<h2>Constant Array </h2>
		define( string, array());<br>
		define( string, mixed-value, bcase_insensitive);<br><br>
		<?php
			define("ARR", array('adobe', 234, 7.7, (2==2)));
			print("Constant array:ARR ('adobe', 234, 7.7, (2==2))<br>");
			print_r(ARR);
			print("<br>");
		?>
		<hr>
		
	</body>
</html>