import html from "./html.js";
import store from "./clock/store.js";
import Clock from "./clock/components/clock.js";
import Status from "./clock/components/status.js";
import Alarm from "./clock/components/alarm.js"

ReactDOM.render(html`
	<${ReactRedux.Provider} store=${store}>
		<${Status} />
		<${Clock} />
		<${Alarm} />
  <//>`,
	document.getElementById("root")
);
