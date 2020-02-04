import createSagaMiddleware from "/vendor/redux-saga.js";
import rootReducer from "./reducers.js";
import saga from "./saga.js";

const initSagaMiddleware = createSagaMiddleware();

const store = Redux.createStore(
	rootReducer,
	Redux.compose(Redux.applyMiddleware(initSagaMiddleware))
);

initSagaMiddleware.run(saga);

export default store;
