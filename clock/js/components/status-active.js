import html from "../render-html.js";

class SnoozeButton extends React.Component {
	handleClick(e) {
		e.preventDefault();
		console.log("snooze clicked");
	}
	render() {
		return html`<a 
			onClick=${this.handleClick}
			href="#" className="snooze-button">Snooze</a>`;
	}
}

class StopAlarmButton extends React.Component {
	handleClick(e) {
		e.preventDefault();
		console.log("stop clicked");
	}
	render() {
		return html`<a
			onClick=${this.handleClick}
			href="#"  className="stop-button">Stop</a>`;
	}
}

class ActiveStatus extends React.Component {
	render() {
		return html`
			<div className="status-active-container">
				<${SnoozeButton}/>
				<${StopAlarmButton} />
			</div>
		`;
	}
}

export default ActiveStatus;
