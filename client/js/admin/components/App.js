import html from '../../html.js';
import AlarmList from "./AlarmList.js";
import ModalManager from "./Modal.js";

const App = () => (
	html`
	<div>
		<${AlarmList} />
		<${ModalManager} />
	</div>`
);

export default App;
