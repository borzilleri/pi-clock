import html from '../render-html.js';
import { snoozeAlarm, stopAlarm } from '/shared/actions.js';

const snoozeMapDispatchToProps = (dispatch) => {
	return {
		snoozeAlarm: dispatch(snoozeAlarm())
	}
}
class ConnectedSnoozeButton extends React.Component {
	handleClick(e) {
		e.preventDefault();
		console.log("Snoozing active alarm.");
		this.props.snoozeAlarm();
	}
	render() {
		return html`<a onClick=${this.handleClick}
			href="#" className="snooze-button">Snooze</a>`;
	}
}
const SnoozeButton = ReactRedux.connect(null, snoozeMapDispatchToProps)(ConnectedSnoozeButton);


const stopMapDispatchToProps = (dispatch) => {
	return {
		stopAlarm: dispatch(stopAlarm())
	}
}
class ConnectedStopButton extends React.Component {
	handleClick(e) {
		e.preventDefault();
		console.log("Active alarm stopped.");
		this.props.stopAlarm();
	}
	render() {
		return html`<a onClick=${this.handleClick}
			href="#" className="stop-button">Stop</a>`;
	}
}
const StopButton = ReactRedux.connect(null, stopMapDispatchToProps)(ConnectedStopButton);

class ActiveStatus extends React.Component {
	render() {
		return html`
			<div className="status-active-container">
				<${SnoozeButton}/>
				<${StopButton} />
			</div>
		`;
	}
}

export default ActiveStatus;
