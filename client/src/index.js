import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import registerServiceWorker from "./serviceWorker";
import { BrowserRouter as Router} from "react-router-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducer/indexReducer";
import {Provider} from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {setCurrentUser} from "./store/action/actions";
import logger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"

import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SERVER_PORT } from "./config"
import store from "./store"

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,logger)));

const httpLink = createHttpLink({
	uri: `${SERVER_PORT}/graphql`
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: httpLink,
	cache
});

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);

	store.dispatch(setCurrentUser(decoded));   
}
const app = (
	<ApolloProvider client={client}>
	<Provider store={store}>
		<Router>
			<App/>
		</Router>
	</Provider>
	</ApolloProvider>
	)
ReactDOM.render(app, document.getElementById("root"));
//registerServiceWorker();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
