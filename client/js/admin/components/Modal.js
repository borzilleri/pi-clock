import html from '../../html.js';
import { MODAL_OFF, MODAL_ALARM_FORM } from '../../constants.js';
import AlarmForm from './AlarmForm.js';
import { closeEditor } from '../actions.js';

class ConnectedModal extends React.Component {
	constructor(props) {
		super(props);
		this.onClose = this.onClose.bind(this);
	}
	onClose() {
		this.props.closeEditor();
	}
	render() {
		return html`
		<div className="overlay">
		<div className="overlay-content">
			<div className="overlay-header">
				<a href="#" className="overlay-close" onClick=${this.onClose}>❌</a>
				<span>${this.props.title}</span>
			</div>
			<div className="overlay-body">${this.props.children}</div>
		</div>
		</div>`;
	}
}
const Modal = ReactRedux.connect(null, { closeEditor })(ConnectedModal);

const DisabledModal = (props) => html`<div></div>`;

class ConnectedModalManager extends React.Component {
	constructor(props) {
		super(props);
	}
	getModalComponent() {
		switch (this.props.type) {
			case MODAL_OFF:
				return DisabledModal;
			case MODAL_ALARM_FORM:
				return Modal
		}
	}
	getModalTitle() {
		const {
			data: { name } = { name: "New Alarm" }
		} = this.props
		return name;
	}
	render() {
		return html`
		<div className="modal-container">
		<${this.getModalComponent()} title=${this.getModalTitle()}>
			<${AlarmForm} data=${this.props.data}/>
		</>
		</div>`;
	}
}
const ModalManager = ReactRedux.connect(
	(state) => {
		return {
			type: state.modal.type,
			data: state.modal.data
		}
	},
	null
)(ConnectedModalManager);

export default ModalManager;
