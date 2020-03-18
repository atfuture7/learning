// Main() of ReactJS Project 05_gamer_rep
// Exercise 05, Gamer's interviewing report
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Interview from './Interview.js';

var iRndMax = Math.floor(Math.random() * 10);
var iRndDem = Math.floor(Math.random() * 4);

// pass props into ReactJS via JSX 
ReactDOM.render(<Interview max={iRndMax} demand={iRndDem} />, document.getElementById('root'));

/*
	20200316 Exercised designed based on tutirual render, jsx, components, props 
		at https://www.w3schools.com/REACT/default.asp
		
		This project generates a report of one gamer/journalist.
		The name of the gamer. Games this person wants to try in March 2020.
		How many game reviews are on demand. How many hours required in estimation.
		
		Originally, I designed it similar to previous es6 style, containing 
		2 buttons and showing appending report. But there're also other 
		attribute practices needed. Current design would be the better solution. 
	
	20200317 JSX properties doesn't show in constroctor. Interview object can only 
		practice props at JSX inline creation. 
*/