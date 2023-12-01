import App from 'App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from 'layout/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContextProvider } from 'context/AppContextProvider';

import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import thunk from 'redux-thunk';
import rootReducer from 'modules';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import BBSNavi from 'layout/BBSNavi';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk)),);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<AppContextProvider>
			<Router>
				<BBSNavi />
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
				<Footer />
			</Router>
		</AppContextProvider>
	</Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
