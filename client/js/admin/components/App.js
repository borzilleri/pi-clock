import html from '../../html.js';
import AlarmList from "./AlarmList.js";

const App = () => (
	html`
	<div>
		<h2>Alarms</h2>
		<${AlarmList} />
	</div>`
);

export default App;
