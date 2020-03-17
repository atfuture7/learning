import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Interview from './Interview.js';
//import * as serviceWorker from './serviceWorker';

var iRndMax = Math.floor(Math.random() * 10);
var iRndDem = Math.floor(Math.random() * 4);

ReactDOM.render(<Interview max={iRndMax} demand={iRndDem} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
