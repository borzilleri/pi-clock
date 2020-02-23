import html from "../../html.js";

// Test Alarm
const mapStateToProps = ({alarm}) => {
	return {
		name: alarm.name,
	}
}

class ConnectedActiveAlarm extends React.Component {
	render() {
		return html`
		<div className="alarm-pending">
			<span className="alarm-name">${this.props.name}</span>
		</div>`;
	}
}

const ActiveAlarm = ReactRedux.connect(mapStateToProps)(ConnectedActiveAlarm);

export default ActiveAlarm;
