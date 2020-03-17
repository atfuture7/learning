function getRandOrder(iMax, iSelect = -1) {
	var aArr = [];
	var aRet = [];
	var iVal, iLen;
	
	if (iSelect <=0 || iSelect > iMax) iSelect = iMax;
	
	for (var i=0; i< iMax; i++) aArr.push(i);
	iLen = aArr.length;
	for (i=0; i< iSelect; i++) {
		iVal = aArr[Math.floor(Math.random() * iLen)];
		if (iVal >= iLen) iVal = iLen-1;
		console.log( iVal + ", " + iLen + "\n" );
		aRet.push( aArr[iVal]);
		aArr.splice(iVal, 1);
		iLen--;
	}
	return aRet;
}

console.log( getRandOrder(10, 7));