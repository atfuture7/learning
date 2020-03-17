//class Interviewer 
import React from 'react';
import ReactDOM from 'react-dom';
import util from './utilities.js';

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
		//iMax, iDemand, aOrder, iName;
		if ( typeof( this.props.max) === 'undefined' ) 
			this.iMax = Math.floor(Math.random() * aGames.length);
		else 
			this.iMax = util.getMin([this.props.max, aGames.length]);
		
		if (typeof( this.props.demand) === 'undefined') 
			this.iDemand = Math.floor(Math.random() * iMax);
		else 
			this.iDemand = util.getMin( [this.props.demand, iMax]);
		
		this.aOrder = util.getRandOrder(aGames.length, this.iMax);
		
		iName = Math.floor(Math.random() * aNames.length);
	}

	render () {
		var sGames = "";
		for (i=1; i< this.iDemand; i++) {
			sGame += ", " + aGames[ aOrder[i]];
		}
		sGames = aGames[ aOrder[0]] + sGames;
		
		return(
			<div>
				<p> {aNames[ this.iName]}'s schedule </p>
				<p> 
					{sGames} are listed, and {this.iDemand} reports
					needed. I'll spend { this.iMax + this.iDemand*4} 
					hours on gaming. 
			</div>
		);
	}
}

export default Interview;