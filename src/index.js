import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './stores/store.js';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
    	<App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);