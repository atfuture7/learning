// class Interviewer: report generator 
import React from 'react';
// tool functions
import {getMin, getRandOrder} from './utilities.js';

// static data: names of gamers' and games'
const aNames = [ 'Jody', 'Shaun', 'Rachel', 'Andy', 'Naomi', ];
const aGames = [ 'Destiny 2: Season of the Worthy',		//0
				'The Elder Scrolls Online: Harrowstorm', 
				'Ori and the Will of the Wisps', 
				'Hidden Through Time', 
				'Overpass', 
				'Artificial Extinction', 				//5
				'Dead or School', 
				'MLB The Show 20', 
				'My Hero One\'s Justice 2', 
				'Nioh 2', 
				'Shantae: Half-Genie Hero',				//10
				'Sonic Generations',
				'The Division 2',
				'Green: An Orc\'s Life',
				'Total War: Three Kingdoms: A World Betrayed DLC',
				];


class Interview extends React.Component {

	constructor() {
		super();
		this.iMinimum = 2; 		//minimun counts in list
		this.bReset = true;		// reset data. for button event if defined. 
		//other members of this class:
		// iMax: max counts in gamer's list 
		// iDemand: counts of reviews on demand
		// aOrder: showing order of static game list: aGames
		// iName: gamer's id in aNames
	}

	// reset gamer's data
	resetData() {
		// max count in a gamer's list
		if ( typeof( this.props.max) === 'undefined')  
			this.iMax = Math.floor(Math.random() * aGames.length);
		else 
			this.iMax = getMin([this.props.max, aGames.length]);
		if (this.iMax < this.iMinimum) this.iMax = this.iMinimum; 

		// counts of reviews required
		if ( false && typeof( this.props.demand) === 'undefined') 
			this.iDemand = Math.floor(Math.random() * this.iMax);
		else 
			this.iDemand = getMin( [this.props.demand, this.iMax]);
		
		// generate a game list, make it different from static sGames
		this.aOrder = getRandOrder(aGames.length, this.iMax);
		
		this.iName = Math.floor(Math.random() * aNames.length);
		
		this.bReset = false;
	}
	
	render () {
		if (this.bReset) this.resetData();
		var sGames = "";	// formating game list
		var bDebug = false;	// if show debug message
		var debStr = "";	// debug message
		
		for (var i=1; i< this.iMax; i++) {
			sGames += ", <" + aGames[ this.aOrder[i]] +">";
		}
		sGames = "<"+ aGames[ this.aOrder[0]] +">" + sGames;

		// debug message
		if (bDebug) 
			debStr = (
				<p> 
					iMax is {this.iMax}, {this.props.max} <br />
					iName is {this.iName} <br />
					iDemand is {this.iDemand}, {this.props.demand} <br />
				order is {this.aOrder.toString()}<br />
				</p>
			);
			
		// remder data
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