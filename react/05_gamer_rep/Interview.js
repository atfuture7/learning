//class Interviewer 
import React from 'react';
//import ReactDOM from 'react-dom';
import {getMin, getRandOrder} from './utilities.js';

const aNames = [ 'Jody', 'Shaun', 'Rachel', 'Andy', 'Naomi', ];
const aGames = [ 'Destiny 2: Season of the Worthy', 
				'The Elder Scrolls Online: Harrowstorm', 
				'Ori and the Will of the Wisps', 
				'Hidden Through Time', 
				'Overpass', 
				'Artificial Extinction', 
				'Dead or School', 
				'MLB The Show 20', 
				'My Hero One\'s Justice 2', 
				'Nioh 2', 
				];


class Interview extends React.Component {

	constructor() {
		super();
		this.iMinimum = 2;
		this.bReset = true;
/*		
		//iMax, iDemand, aOrder, iName;
 		
*/		
	}

	resetData() {
		if ( typeof( this.props.max) === 'undefined')  
			this.iMax = Math.floor(Math.random() * aGames.length);
		else 
			this.iMax = getMin([this.props.max, aGames.length]);
		if (this.iMax < this.iMinimum) this.iMax = this.iMinimum; 


		if ( false && typeof( this.props.demand) === 'undefined') 
			this.iDemand = Math.floor(Math.random() * this.iMax);
		else 
			this.iDemand = getMin( [this.props.demand, this.iMax]);
		
		this.aOrder = getRandOrder(aGames.length, this.iMax);
		
		this.iName = Math.floor(Math.random() * aNames.length);
		
		this.bReset = false;
	}
	
	render () {
		if (this.bReset) this.resetData();
		var sGames = "";
		var bDebug = false;
		var debStr = "";
		for (var i=1; i< this.iMax; i++) {
			sGames += ", <" + aGames[ this.aOrder[i]] +">";
		}
		sGames = "<"+ aGames[ this.aOrder[0]] +">" + sGames;

		if (bDebug) 
			debStr = (
				<p> 
					iMax is {this.iMax}, {this.props.max} <br />
					iName is {this.iName} <br />
					iDemand is {this.iDemand}, {this.props.demand} <br />
				order is {this.aOrder.toString()}<br />
				</p>
			);
		return(
			<div>
				<p> {aNames[ this.iName]}'s schedule </p>
				<p> 
					{sGames} are listed, <br />
					and {this.iDemand} reports needed. 
					Will spend { this.iMax + this.iDemand*4} hours
					on gaming. 
				</p>
				{debStr}
			</div>
		);
	}
}

export default Interview;