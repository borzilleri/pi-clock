import html from "../../html.js";

const activationTimeFormat = 'HH:mm';

const mapStateToProps = ({alarm, settings}) => {
	return {
		name: alarm.name,
		activeMoment: moment.unix(alarm.activationTime).tz(settings.timeZone),
		timeZone: settings.timeZone
	}
}

const ConnectedPendingAlarm = ({ name, activeMoment, timeZone }) => {
	let activationDay = activeMoment.format('dd ')
	activationDay = activationDay === moment().tz(timeZone).format('dd ') ? '' : activationDay;
	return html`
		<div className="alarm-with-time">
			${activationDay}${activeMoment.format(activationTimeFormat)}: ${name}
		</div>`;
}

const PendingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedPendingAlarm);

export default PendingAlarm;
