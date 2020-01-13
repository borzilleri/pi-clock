
import rootReducer from "./reducers.mjs";
import createSagaMiddleware from "/vendor/redux-saga.js";
import saga from "./sagas.mjs";

const initSagaMiddleware = createSagaMiddleware();
const storeEnhancers = Redux.compose;

const store = Redux.createStore(
	rootReducer,
	storeEnhancers(Redux.applyMiddleware(initSagaMiddleware))
);

initSagaMiddleware.run(saga);

export default store;
