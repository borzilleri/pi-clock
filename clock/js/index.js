import store from "./store.js";
import Clock from "./components/clock.js";
import Status from "./components/status.js";
import Alarm from "./components/alarm.js"
import html from "./render-html.js";

window.store = store;

const Provider = ReactRedux.Provider;
const render = ReactDOM.render;
render(html`
	<${Provider} store=${store}>
		<${Status} />
		<${Clock} />
		<${Alarm} />
  <//>`,
  document.getElementById("root")
);
