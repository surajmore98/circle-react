import "./index.css";
import App from "./App";
import { store } from "./store/Store";
import { makeServer } from "./server";
import { Provider } from "react-redux";
import React, { StrictMode } from "react";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";

// Call make Server
makeServer();

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <ChakraProvider>
          <ColorModeScript />
          <App/>
        </ChakraProvider>
      </Provider>  
    </Router>
  </StrictMode>
);
