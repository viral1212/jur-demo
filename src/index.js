import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import actionCable from 'actioncable';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ActionCableContext } from './context/actionCableContext';

const CableApp = {};
CableApp.cable = actionCable.createConsumer(process.env.REACT_APP_WS_BASE_URL);

ReactDOM.render(
  <React.StrictMode>
    <ActionCableContext.Provider value={CableApp.cable}>
      <Provider store={store}>
        <ToastContainer closeButton={false} />
        <App />
      </Provider>
    </ActionCableContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
