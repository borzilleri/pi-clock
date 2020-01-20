import html from "../render-html.js";

// Test Alarm: 12:12
const mapStateToProps = (state) => {
	return {
		name: state.name,
		activeTime: moment.unix(state.activationTime).format('HH:mm')
	}
}

class ConnectedPendingAlarm extends React.Component {
	render() {
		return html`
		<div className="alarm-pending">
			<span className="alarm-name">${this.props.name}: </span>
			<span className="alarm-time">${this.props.activeTime}</span>
		</div>`;
	}
}

const PendingAlarm = ReactRedux.connect(mapStateToProps)(ConnectedPendingAlarm);

export default PendingAlarm;
