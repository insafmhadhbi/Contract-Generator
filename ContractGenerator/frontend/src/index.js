import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store";
import { I18nextProvider } from 'react-i18next';
import i18n from "./i18n.js"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <I18nextProvider i18n={ i18n }>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
