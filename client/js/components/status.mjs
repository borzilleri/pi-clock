import html from "../render-html.mjs";


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

class ActiveAlarm extends React.Component {
	render() {
		return html`
			<div className="status-active-container">
				<${SnoozeButton}/>
				<${StopAlarmButton} />
			</div>
		`;
	}
}

class SnoozingAlarm extends React.Component {
	render() {
		return html`
			<div className="status-snoozing-container">
				<span className="snoozing">Snoozing</span>
			</div>
		`;
	}
}

class Status extends React.Component {
	render() {
		
		return html`
		<div id="status"><${ActiveAlarm} /></div>
		`;
	}
}
export default Status;
