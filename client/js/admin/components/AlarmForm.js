import html from '../../html.js';
import { saveAlarm } from '../actions.js';
import { WEEK_DAYS } from '../../constants.js';
import autoBind from '../../autoBind.js';

const WeekdayCheckbox = ({ index, checked, onChange, children }) => {
	const id = `week-day-${index}`;
	return html`
		<div className="form-check form-check-inline">
			<input type="checkbox" id="${id}" value=${index} defaultChecked=${checked} onChange=${onChange}/>
			<label htmlFor="${id}">${children}</label>
		</div>`;
}

const TextInput = ({ name, defaultValue, onChange, ...props }) => {
	return html`
		<div className="form-group">
			<label htmlFor="alarm-${name}">${name}</label>
			<input className="form-control" id="alarm-${name}" type="text" defaultValue=${defaultValue} onChange=${onChange}
				readOnly=${props.readOnly}/>
		</div>`;
}

const Checkbox = ({ name, checked, onChange }) => {
	return html`
		<div className="form-group form-check">
			<input type="checkbox" id="alarm-${name}" onChange=${onChange} defaultChecked=${checked}/>
			<label htmlFor="alarm-${name}">${name}</label>
		</div>`;
}


class ConnectedAlarmForm extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = {};
	}

	/**
	 * @param {Event} e 
	 */
	onSubmit(e) {
		e.preventDefault();
		this.props.saveAlarm(this.state, this.props.data._id);
	}
	/**
	 * @param {Event} e 
	 */
	onChangeName(e) {
		this.state.name = e.target.value;
	}
	onChangeSound(e) {
		this.state.sound = e.target.value;
	}
	onChangeTime(e) {
		console.log(`time changed to: ${e.target.value}`)
	}
	onChangeEnabled(e) {
		this.state.enabled = e.target.checked;
	}
	onChangeRecurring(e) {
		this.state.recurring = e.target.checked;
	}
	onChangeWeekDay(e) {
		console.log(`day ${e.target.value} set to: ${e.target.checked}`);
	}
	render() {
		return html`
		<form onSubmit=${this.onSubmit}>
			<${TextInput} name="ID" defaultValue=${this.props.data._id} readOnly/>
			<${TextInput} name="Name" defaultValue=${this.props.data.name} onChange=${this.onChangeName}/>

			<div className="form-group">
				<label htmlFor="alarm-sound">Sound</label>
				<input className="form-control" id="alarm-sound" type="text" onChange=${this.onChangeSound}
					defaultValue=${this.props.data.sound} readOnly/>
			</div>

			<div className="form-group">
				<label>Time</label>
				<input className="form-control" id="alarm-time" type="time" onChange=${this.onChangeTime}
					defaultValue="${moment({ hour: this.props.data.hour, minute: this.props.data.minute }).format('HH:mm')}" />
			</div>

			<${Checkbox} name="Enabled" checked=${this.props.data.enabled} onChange=${this.onChangeEnabled}/>
			<${Checkbox} name="Recurring" checked=${this.props.data.weekDay.length > 0} onChange=${this.onChangeRecurring}/>			

			<div className="form-group">
				<label>Recurs On</label>
				<div className="form-control">
					${WEEK_DAYS.map((d, i) => html`<${WeekdayCheckbox} key="week-day-${i}" index=${i} 
						checked=${this.props.data.weekDay.includes(i)} onChange=${this.onChangeWeekDay}>${d}</>`)}
				</div>
			</div>

			<button className="button" type="submit">Save</button>
		</form>
		`;
	}
}

const AlarmForm = ReactRedux.connect(null, { saveAlarm })(ConnectedAlarmForm);

export default AlarmForm

