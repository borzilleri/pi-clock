import html from "../../html.js";
import { snoozeAlarm, stopAlarm } from '../actions.js';

const snoozeMapDispatchToProps = (dispatch) => {
	return {
		snoozeAlarm: () => dispatch(snoozeAlarm())
	}
}
class ConnectedSnoozeButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		e.preventDefault();
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
		stopAlarm: () => dispatch(stopAlarm())
	}
}
class ConnectedStopButton extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		e.preventDefault();
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
