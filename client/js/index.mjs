import store from "./store.mjs";
import Clock from "./components/clock.mjs";
import html from "./render-html.mjs";

window.store = store;

const Provider = ReactRedux.Provider;
const render = ReactDOM.render;
render(html`
  <${Provider} store=${store}>
		<div id="status">Test</div>
    <${Clock} />
		<div id="alarm">
			<span id="alarm-label">Alarm: </span>
			<span id="alarm-time">12:12</span>
		</div>
  <//>`,
  document.getElementById("root")
);

import {put} from "/vendor/redux-saga-effects.js"
put({type:'DEBUG_REQUEST', payload: 'request test'});
