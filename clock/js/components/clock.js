import html from "../render-html.js";

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: moment().format('hh:mm')
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
			time: moment().format('hh:mm')
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
export default Clock;
