import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const todoItems = [
  {
    task: "Get pizza for dinner",
    complete: false,
  },
  {
    task: "Finish the merit challenge",
    complete: false,
  },
  {
    task: "Todo 3",
    complete: true,
  },
];

ReactDOM.render(
  <React.StrictMode>
    <App todoItems={todoItems} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
