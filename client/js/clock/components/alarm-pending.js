import html from "../../html.js";

const activationTimeFormat = 'HH:mm';

const mapStateToProps = (state) => {
	return {
		name: state.name,
		activeMoment: moment.unix(state.activationTime),
	}
}

const ConnectedPendingAlarm = ({ name, activeMoment }) => {
	let activationDay = activeMoment.format('dd ')
	activationDay = activationDay === moment().format('dd ') ? '' : activationDay;
	return html`
		<div className="alarm-pending">
			<span className="alarm-name">${name}: </span>
			<span className="alarm-time">
				${activationDay}
				${activeMoment.format(activationTimeFormat)}
			</span>
		</div>`;
}

const PendingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedPendingAlarm);

export default PendingAlarm;
