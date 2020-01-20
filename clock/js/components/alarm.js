import html from "../render-html.js";
import { STATUS_PENDING, STATUS_ACTIVE, STATUS_SNOOZING } from "/shared/constants.js";

import ActiveAlarm from "./alarm-active.js";
import SnoozingAlarm from "./alarm-snoozing.js";
import PendingAlarm from "./alarm-pending.js";

const mapStateToProps = (state) => {
	return {
		alarmStatus: state.status
	}
}

import {sendDebugMessage} from "/shared/actions.js";
const mapDispatchToProps = (dispatch) => {
	return {
		debug: message => dispatch(sendDebugMessage(message))
	};
}

class InactiveAlarm extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		this.props.debug("clicked!")
	}
	render() {
		return html`<div onClick=${this.handleClick} className="alarm-inactive">No Alarms</div>`;
	}
}

let cInactiveAlarm = ReactRedux.connect(null, mapDispatchToProps)(InactiveAlarm);

class ConnectedAlarm extends React.Component {
	getComponent() {
		switch (this.props.alarmStatus) {
			case STATUS_SNOOZING:
				return SnoozingAlarm;
			case STATUS_PENDING:
				return PendingAlarm;
			case STATUS_ACTIVE:
				return ActiveAlarm;
			default:
				return cInactiveAlarm;
		}
	}
	render() {
		return html`
		<div id="alarm">
			<${this.getComponent()} />
		</div>
		`;
	}
}

const Alarm = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ConnectedAlarm);

export default Alarm;
