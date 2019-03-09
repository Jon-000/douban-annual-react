import React from 'react';
import ReactDOM from 'react-dom';

import './reset.css';
import './index.css';
// import './utils/rem';



import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

document.documentElement.style.fontSize = "10px";

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
