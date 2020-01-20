import html from "../render-html.js";

class SnoozingStatus extends React.Component {
	render() {
		return html`
			<div className="status-snoozing-container">
				<span className="snoozing">Snoozing</span>
			</div>
		`;
	}
}

export default SnoozingStatus;
