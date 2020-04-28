<?php
//draw a decorative triangle section 
function putSymble(bool $acc, int $line, int $len, $sSym="*") {
        $iStep = intval($len/$line);
        $iAdd = (($len%$line)>0)?1:0;
		$iStart = $iStep;

		if (!$acc) {
			$iStart = $len;
			$iStep *= -1;
			$iAdd *= -1;
		}
		
		$sShow = "";
		for ($i = 0; $i<$line; $i++) {
			$sOut = "";
			$numSymble = $iStart + $iStep*$i + $iAdd;
			$sOut = str_pad($sOut, $numSymble, $sSym);
			$sShow .= $sOut."<br/>\n";
		}
		return $sShow;
		
		
}


echo putSymble( true, 5, 25, "-*-");
echo putSymble( false, 5, 25, "-x-");
?>