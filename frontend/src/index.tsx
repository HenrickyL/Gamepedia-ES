
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import {store} from './store';
import 'dotenv/config'
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { theme } from './styleGlobal';
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
          <App />
      </Provider>
    </ChakraProvider>

  </React.StrictMode>,
  document.getElementById('root')
);


