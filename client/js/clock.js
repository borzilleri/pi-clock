import html from "./html.js";
import store from "./clock/store.js";
import Clock from "./clock/components/clock.js";
import Status from "./clock/components/status.js";
import Alarm from "./clock/components/alarm.js"

fetch('/client/js/tzdata.json')
	.then(response => response.json())
	.then(tzdata => moment.tz.load(tzdata))
	.then(() => {
		ReactDOM.render(html`
		<${ReactRedux.Provider} store=${store}>
			<${Status} />
			<${Clock} />
			<${Alarm} />
		<//>`,
			document.getElementById("root")
		);
	});

