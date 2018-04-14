import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <div>
    <div>hello</div>
    <div>why</div>
    <App />
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
