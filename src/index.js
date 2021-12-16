import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import actionCable from 'actioncable';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import './index.css';
import { ActionCableContext } from './context/ActionCableContext';

const CableApp = {};
CableApp.cable = actionCable.createConsumer('ws://34.122.252.114:3000/cable');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ActionCableContext.Provider value={CableApp.cable}>
        <App />
      </ActionCableContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
