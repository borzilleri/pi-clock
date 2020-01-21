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

class InactiveAlarm extends React.Component {
	render() {
		return html`<div className="alarm-inactive">No Alarms</div>`;
	}
}

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
				return InactiveAlarm;
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

const Alarm = ReactRedux.connect(mapStateToProps)(ConnectedAlarm);

export default Alarm;