import html from "../render-html.js";

// Test Alarm
const mapStateToProps = (state) => {
	return {
		name: state.name,
	}
}

class ConnectedActiveAlarm extends React.Component {
	render() {
		return html`
		<div className="alarm-pending">
			<span className="alarm-name">${this.props.name}: </span>
		</div>`;
	}
}

const ActiveAlarm = ReactRedux.connect(mapStateToProps)(ConnectedActiveAlarm);

export default ActiveAlarm;
