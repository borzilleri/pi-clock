import html from "../render-html.mjs";
import { STATUS_INACTIVE, STATUS_ACTIVE, STATUS_SNOOZING } from "../constants.mjs";
import ActiveAlarm from "./alarm-active.mjs";
import SnoozingAlarm from "./alarm-snoozing.mjs";
import InactiveAlarm from "./alarm-inactive.mjs";

const mapStateToProps = (state) => {
	return {
		alarmStatus: state.currentStatus
	}
}

class ConnectedStatus extends React.Component {
	getComponent() {
		switch(STATUS_INACTIVE) {
			case STATUS_INACTIVE:
				return InactiveAlarm;
			case STATUS_ACTIVE:
				return ActiveAlarm;
			case STATUS_SNOOZING:
				return SnoozingAlarm;
		}
	}
	render() {
		return html`
		<div id="status"><${this.getComponent()} /></div>
		`;
	}
}

const Status = ReactRedux.connect(mapStateToProps)(ConnectedStatus);

export default Status;
