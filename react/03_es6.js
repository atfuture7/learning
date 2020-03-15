// exercise of es6

//basic class, reaction for button click
//cons: initialized much text that useless to child class. to show override. 
class BtnExpress {
	//constructor is not allowed to be an arrow function
	constructor() {
		this.expression = [
							'What\'s the best thing about Switzerland? I don\'t know, but the flag is a big plus.',
							'As a scarecrow, people say I\'m outstanding in my field. But hay - it\'s in my jeans.',
							'"I\'d like to start with the chimney jokes - I\'ve got a stack of them. The first one is on the house." - Tim Vine',
							'"The best time to add insult to injury is when you\'re signing somebody\'s cast." - Demetri Martin',
							'"Years ago I used to supply Filofaxes for the mafia. I was involved in very organised crime." - Milton Jones'
							];
		this.max = this.expression.length;
	}
	
	onClickEvent = (objP) => {
		var id = Math.floor(Math.random() * this.max);
		objP.innerHTML += this.expression[id] + "</br>";
	}
}

//class of controlor. 
//cons: probably..... they're completely different classes that 
//		need no inherit.... anyway... just a practice....
class BtnControl extends BtnExpress {
	constructor() {
		super();
		this.iStatus = 1;
		delete this.expression;
		this.expression = 'silent';
	}
	
	//try to call parent's onClickEvent, but failed even tried to change 
	//the number of parameters. 
	onClickEvent = function (objP, objBtn, fch) {
		if (this.iStatus == 1) {
			//erase
			objP.innerHTML = this.expression;
			objBtn.removeEventListener("click", fch );
		} else {
			//revive 
			objP.innerHTML = "";
			objBtn.addEventListener("click", fch );
			objBtn.click();
		}
		
		this.iStatus = (this.iStatus +1)%2;
	}
	
}


BtnExp = new BtnExpress();
BtnCtrl = new BtnControl();

// BtnExp's function handler should be passed to other functions. 
// must not an anonymous. 
function fcHandler() {
	BtnExp.onClickEvent (htmlP);
}

let htmlP = document.getElementById("demo");
let htmlBtn = document.getElementById("btn") ;

htmlBtn.addEventListener("click", fcHandler);

document.getElementById("btn2").addEventListener("click", function () {
															BtnCtrl.onClickEvent( htmlP, htmlBtn, fcHandler);
														});

// 0315 pracktice redesigned from https://www.w3schools.com/react/react_es6.asp
// about class, inheritance, arrow function, let, var (but no const)
// one button to output jokes, (extendable at init) 
// the other button to switch the previous' functionality 