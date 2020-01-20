import html from "../render-html.js";

function formatSnoozeTime(snoozeUntil) {
	let duration = moment.duration(moment().diff(snoozeUntil))
	return `${Math.floor(duration.asMinutes())}m ${duration.seconds()}s`;
}

// Test Alarm: 9m 10s
const mapStateToProps = (state) => {
	let activeOn = moment.unix(state.activationTime);
	return {
		name: state.name,
		snoozeUntil: moment.unix(state.activationTime),
		snoozeTime: formatSnoozeTime(activeOn)
	}
}


class ConnectedSnoozingAlarm extends React.Component {
	componentDidMount() {
		this.intervalId = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
	tick() {
		this.setState({
			snoozeTime: formatSnoozeTime(this.props.snoozeUntil)
		});
	}
	render() {
		return html`
		<div className="alarm-snoozing">
			<span className="alarm-name">${this.props.name}: </span>
			<span className="alarm-time">${this.props.snoozeTime}</span>
		</div>`;
	}
}

const SnoozingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedSnoozingAlarm);

export default SnoozingAlarm;
