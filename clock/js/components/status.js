import html from "../render-html.js";
import { STATUS_ACTIVE, STATUS_SNOOZING } from "/shared/constants.js";
import ActiveStatus from "./status-active.js";
import SnoozingStatus from "./status-snoozing.js";
import InactiveStatus from "./status-inactive.js";

const mapStateToProps = (state) => {
	return {
		alarmStatus: state.status
	}
}

class ConnectedStatus extends React.Component {
	getComponent() {
		switch (this.props.alarmStatus) {
			case STATUS_ACTIVE:
				return ActiveStatus;
			case STATUS_SNOOZING:
				return SnoozingStatus;
			default:
				return InactiveStatus
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
