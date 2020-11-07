import html from "../../html.js";

let clockFormat = 'HH:mm';

const mapStateToProps = ({ settings }) => {
	return { timeZone: settings.timeZone }
}
class ConnectedClock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: moment().tz(props.timeZone).format(clockFormat)
		}
	}
	componentDidMount() {
		this.intervalId = setInterval(() => this.tick(), 1000);
	}
	componentWillUnmount() {
		clearInterval(this.intervalId);
	}
	tick() {
		this.setState({
			time: moment().tz(this.props.timeZone).format(clockFormat)
		});
	}
	render() {
		return html`
		<div id="clock">
			<span id="clock-text">${this.state.time}</span>
		</div>
		`;
	}
}
const Clock = ReactRedux.connect(mapStateToProps)(ConnectedClock);

export default Clock;
