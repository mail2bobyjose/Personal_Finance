import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

import { amplifyConfig } from "./aws-config";
import App from "./App";

Amplify.configure(amplifyConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);