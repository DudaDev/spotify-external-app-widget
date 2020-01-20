import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


export function init({ containerId, container, props = {} } = {}) {
  const parent = container || document.getElementById(containerId)
  ReactDOM.render(<App {...props} />, parent);
}

export function clean({ container } = {}) {
  if (container) {
    React.DOM.unmountComponentAtNode(container);
  }
}

if (process.env.NODE_ENV === "development") {
  init({ containerId: 'root' });
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
