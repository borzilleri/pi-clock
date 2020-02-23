import html from "../../html.js";

let clockFormat = 'HH:mm';

const mapStateToProps = ({ utcOffset }) => {
	return { utcOffset }
}
class ConnectedClock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: moment().utcOffset(props.utcOffset).format(clockFormat)
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
			time: moment().utcOffset(this.props.utcOffset).format(clockFormat)
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
