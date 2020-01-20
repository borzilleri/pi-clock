import html from "../render-html.js";

class InactiveStatus extends React.Component {
	render() {
		return html`<div className="status-inactive-container">off</div>`;
	}
}

export default InactiveStatus;
