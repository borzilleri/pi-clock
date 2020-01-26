import createSagaMiddleware from "/vendor/redux-saga.js";
import rootReducer from "./reducers.js";
import saga from "./saga.js";

const initSagaMiddleware = createSagaMiddleware();
const storeEnhancers = Redux.compose;

const store = Redux.createStore(
	rootReducer,
	storeEnhancers(Redux.applyMiddleware(initSagaMiddleware))
);

initSagaMiddleware.run(saga);

export default store;
