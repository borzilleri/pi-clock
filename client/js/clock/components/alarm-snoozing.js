import html from "../../html.js";

function formatSnoozeTime(snoozeUntil, utcOffset) {
	let duration = moment.duration(snoozeUntil.diff(moment().utcOffset(utcOffset)));
	return `${Math.floor(duration.asMinutes())}m ${duration.seconds()}s`;
}

// Test Alarm: 9m 10s
const mapStateToProps = ({alarm, settings}) => {
	return {
		name: alarm.name,
		snoozeUntil: moment.unix(alarm.activationTime).utcOffset(settings.utcOffset),
		utcOffset: settings.utcOffset
	}
}


class ConnectedSnoozingAlarm extends React.Component {
	constructor(props) {
		super(props)
		this.tick = this.tick.bind(this);
		this.state = {
			snoozeTime: formatSnoozeTime(this.props.snoozeUntil, this.props.utcOffset)
		}
	}
	componentDidMount() {
		this.intervalId = setInterval(this.tick, 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
	tick() {
		this.setState({
			snoozeTime: formatSnoozeTime(this.props.snoozeUntil, this.props.utcOffset)
		});
	}
	render() {
		return html`
		<div className="alarm-snoozing">
			<span className="alarm-name">${this.props.name}: </span>
			<span className="alarm-time">${this.state.snoozeTime}</span>
		</div>`;
	}
}

const SnoozingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedSnoozingAlarm);

export default SnoozingAlarm;
