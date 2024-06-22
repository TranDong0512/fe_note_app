import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer autoClose={1500}></ToastContainer>
    </Provider>
  </React.StrictMode>
);
