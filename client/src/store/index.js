import React from "react"
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducer/indexReducer";

import logger from "redux-logger"

import { composeWithDevTools } from "redux-devtools-extension"
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk,logger)));
export default store;