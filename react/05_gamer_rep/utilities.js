// utilities
//export default getMin;

// get minimum value, 
// array aCandidates
export function getMin(aCandidates) {
	let iMin = aCandidates[0];
	for ( var i=1; i<aCandidates.length; i++) 
		if (iMin > aCandidates[i]) iMin = aCandidates[i];
	
	return iMin;
}

// regenerate a order list
export function getRandOrder(iMax, iSelect = -1) {
	var aArr = [];
	var aRet = [];
	var iVal, iLen;
	
	if (iSelect <=0 || iSelect > iMax) iSelect = iMax;
	
	//initialize a correct order
	for (var i=0; i< iMax; i++) aArr.push(i);
	
	iLen = aArr.length; //count's of array, same some time
	for (i=0; i< iSelect; i++) {
		iVal = aArr[Math.floor(Math.random() * iLen)];
		
		// there're chances the random number is no less then iLen
		if (iVal >= iLen) iVal = iLen-1; 
		
		aRet.push( aArr[iVal]);
		aArr.splice(iVal, 1);
		iLen--;
	}
	return aRet;
}