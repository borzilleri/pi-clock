import html from "../../html.js";

const activationTimeFormat = 'HH:mm';

const mapStateToProps = ({alarm, settings}) => {
	return {
		name: alarm.name,
		activeMoment: moment.unix(alarm.activationTime).utcOffset(settings.utcOffset),
		utcOffset: settings.utcOffset
	}
}

const ConnectedPendingAlarm = ({ name, activeMoment, utcOffset }) => {
	let activationDay = activeMoment.format('dd ')
	activationDay = activationDay === moment().utcOffset(utcOffset).format('dd ') ? '' : activationDay;
	return html`
		<div className="alarm-pending">
			<span className="alarm-name">${name}</span>
			<span className="alarm-divider">:</span>
			<span className="alarm-time">
				${activationDay}
				${activeMoment.format(activationTimeFormat)}
			</span>
		</div>`;
}

const PendingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedPendingAlarm);

export default PendingAlarm;
