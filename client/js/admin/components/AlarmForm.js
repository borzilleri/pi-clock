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

const mapStateToSoundSelectProps = (state) => {
	return {
		sounds: state.sounds.sounds,
		default: state.sounds.default
	}
}
const ConnectedSoundSelect = ({ selected, onChange, ...props }) => {
	return html`
		<div className="form-group">
			<label htmlFor="alarm-sound">Sound</label>
			<select id="alarm-sound" className="form-control" onChange=${onChange} defaultValue=${selected}>
				${props.sounds.map(sound => 
					html`<option key=${sound}>${sound}</option>`
				)}
			</select>
		</div>
	`;
}
let SoundSelect = ReactRedux.connect(mapStateToSoundSelectProps)(ConnectedSoundSelect);


class ConnectedAlarmForm extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
		this.state = props.data._id ? {} : props.data;
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
		let time = moment(e.target.value, 'HH:mm');
		this.state.hour = time.hour();
		this.state.minute = time.minute();
	}
	onChangeEnabled(e) {
		this.state.enabled = e.target.checked;
	}
	onChangeWeekDay(e) {
		let weekDayIdx = parseInt(e.target.value);
		if (!this.state.weekDays) {
			this.state.weekDays = this.props.data.weekDays.slice(0);
		}
		let exists = this.state.weekDays.includes(weekDayIdx);
		if (e.target.checked && !exists) {
			this.state.weekDays.push(weekDayIdx);
		}
		if (!e.target.checked && exists) {
			this.state.weekDays = this.state.weekDays.filter(d => d !== weekDayIdx);
		}
		this.state.weekDays.sort();
	}
	render() {
		return html`
		<form onSubmit=${this.onSubmit}>
			<${TextInput} name="ID" defaultValue=${this.props.data._id} readOnly/>
			<${TextInput} name="Name" defaultValue=${this.props.data.name} onChange=${this.onChangeName}/>

			<${SoundSelect} onChange=${this.onChangeSound} selected=${this.props.data.sound}/>

			<div className="form-group">
				<label>Time</label>
				<input className="form-control" id="alarm-time" type="time" onChange=${this.onChangeTime}
					defaultValue="${moment({ hour: this.props.data.hour, minute: this.props.data.minute }).format('HH:mm')}" />
			</div>

			<${Checkbox} name="Enabled" checked=${this.props.data.enabled} onChange=${this.onChangeEnabled}/>

			<div className="form-group">
				<label>Recurs On</label>
				<div className="form-control">
					${WEEK_DAYS.map((d, i) => html`<${WeekdayCheckbox} key="week-day-${i}" index=${i} 
						checked=${this.props.data.weekDays.includes(i)} onChange=${this.onChangeWeekDay}>${d}</>`)}
				</div>
			</div>

			<button className="button" type="submit">Save</button>
		</form>`;
	}
}

const AlarmForm = ReactRedux.connect(null, { saveAlarm })(ConnectedAlarmForm);

export default AlarmForm

