import html from '../../html.js';

const ToggleCheckbox = ({ id, defaultChecked, onChange }) => {
	return html`
	<div className="onoffswitch">
		<input type="checkbox" className="onoffswitch-checkbox" id="onoffswitch-${id}"
			defaultChecked=${defaultChecked} onChange=${onChange}/>
		<label className="onoffswitch-label" htmlFor="onoffswitch-${id}"></label>
	</div>
	`;
}

export default ToggleCheckbox;
