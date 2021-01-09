import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ScoreProvider } from "./context/ScoreContext";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-mzle8ryt.us.auth0.com"
      clientId="ef0Z8zNhMdpBDxvLkpX8CV2BMX8zxh0q"
      redirectUri={window.location.origin}
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
