import html from "../../html.js";
import { snoozeAlarm, stopAlarm } from '../actions.js';

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
const SnoozeButton = ReactRedux.connect(null, { snoozeAlarm })(ConnectedSnoozeButton);


const DOUBLE_CONFIRM_TIMEOUT_SECONDS = 10;
class ConnectedStopButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			enabled: false
		}
		this.handleClick = this.handleClick.bind(this);
		this.disable = this.disable.bind(this);
	}
	disable() {
		this.setState({ enabled: false });
	}
	handleClick(e) {
		e.preventDefault();
		if (this.state.enabled) {
			clearTimeout(this.state.disableTimeoutId);
			this.props.stopAlarm();
		}
		else {
			let id = setTimeout(this.disable, DOUBLE_CONFIRM_TIMEOUT_SECONDS * 1000);
			this.setState({
				enabled: true,
				disableTimeoutId: id
			});
		}
	}
	render() {
		return html`<a href="#" className="stop-button ${this.state.enabled ? 'enabled' : ''}" 
			onClick=${this.handleClick}>Stop</a>`;
	}
}
const StopButton = ReactRedux.connect(null, { stopAlarm })(ConnectedStopButton);

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
