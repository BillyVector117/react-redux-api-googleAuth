import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
const store = generateStore(); // Retorna el store con sus 'reducers' combinados
// 'Provider' envuelve los componentes referentes a cada 'Reducer' (tipo 'Router')
ReactDOM.render(
  <React.StrictMode>
    {/* 'Provider' envuelve los componentes que usaran modulos Ducks */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
