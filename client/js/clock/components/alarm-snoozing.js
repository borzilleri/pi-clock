import html from "../../html.js";

function formatSnoozeTime(snoozeUntil, timeZone) {
	let duration = moment.duration(snoozeUntil.diff(moment().tz(timeZone)));
	return `${Math.floor(duration.asMinutes())}m ${duration.seconds()}s`;
}

// Test Alarm: 9m 10s
const mapStateToProps = ({alarm, settings}) => {
	return {
		name: alarm.name,
		snoozeUntil: moment.unix(alarm.activationTime).tz(settings.timeZone),
		timeZone: settings.timeZone
	}
}


class ConnectedSnoozingAlarm extends React.Component {
	constructor(props) {
		super(props)
		this.tick = this.tick.bind(this);
		this.state = {
			snoozeTime: formatSnoozeTime(this.props.snoozeUntil, this.props.timeZone)
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
			snoozeTime: formatSnoozeTime(this.props.snoozeUntil, this.props.timeZone)
		});
	}
	render() {
		return html`
		<div className="alarm-with-time">
			${this.state.snoozeTime}: ${this.props.name}
		</div>`;
	}
}

const SnoozingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedSnoozingAlarm);

export default SnoozingAlarm;
