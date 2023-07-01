import html from '../../html.js';
import { saveAlarm } from '../actions.js';
import { WEEK_DAYS } from '../../constants.js';
import autoBind from '../../autoBind.js';

const WeekdayCheckbox = ({ index, checked, onChange, children }) => {
	const id = `week-day-${index}`;
	return html`
		<div className="form-check form-check-inline">
			<input type="checkbox" id="${id}" value=${index} defaultChecked=${checked} onChange=${onChange}/>
			<label className="form-label" htmlFor="${id}">${children}</label>
		</div>`;
}

const TextInput = ({ name, defaultValue, onChange, ...props }) => {
	return html`
		<label key="${name}-label" className="form-label" htmlFor="alarm-${name}">${name}</label>
		<div key="${name}-input" className="form-group">
			<input className="form-control" id="alarm-${name}" type="text" defaultValue=${defaultValue} onChange=${onChange}
				readOnly=${props.readOnly}/>
		</div>`;
}

const Checkbox = ({ name, checked, onChange }) => {
	return html`
		<div className="form-group form-check">
			<input type="checkbox" 
				id="alarm-${name}" onChange=${onChange} defaultChecked=${checked}/>
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
	let options = props.sounds.map(s => html`<option key=${s}>${s}</option>`);
	let defaultValue = selected ? selected : "Default";
	return html`
		<label key="sound-label" className="form-label" htmlFor="alarm-sound">Sound</label>
		<div key="sound-input" className="form-group">
			<select id="alarm-sound" className="form-control" onChange=${onChange} defaultValue=${defaultValue}>
				<option key="no-sound" disabled>Default</option>
				${options}
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
	onChangeSkipDate(e) {
		console.log(e.target.value)
		if (e.target.value) {
			this.state.skipUntil = moment(e.target.value).unix()
		}
		else {
			this.state.skipUntil = null
		}
	}
	render() {
		return html`
		<form onSubmit=${this.onSubmit}>
			<${TextInput} name="ID" defaultValue=${this.props.data._id} readOnly/>
			<${TextInput} name="Name" defaultValue=${this.props.data.name} onChange=${this.onChangeName}/>

			<${SoundSelect} onChange=${this.onChangeSound} selected=${this.props.data.sound}/>

			<label className="form-label">Time</label>
			<div className="form-group">
				<input className="form-control" id="alarm-time" type="time" 
					onChange=${this.onChangeTime}
					defaultValue="${moment({ hour: this.props.data.hour, 
						minute: this.props.data.minute }).format('HH:mm')}" />
			</div>

			<${Checkbox} name="Enabled" checked=${this.props.data.enabled} 
				onChange=${this.onChangeEnabled}/>

			<label className="form-labl">Recurs On</label>
			<div className="form-group">
				<div className="form-control">
					${WEEK_DAYS.map((d, i) => html`<${WeekdayCheckbox} key="week-day-${i}" index=${i} 
						checked=${this.props.data.weekDays.includes(i)} onChange=${this.onChangeWeekDay}>${d}</>`)}
				</div>
			</div>

			<label className="form-label" htmlFor="alarm-skip-until">Skip Until</label>
			<div className="form-group">
				<input className="form-control" id="alarm-skip-until" type="date"
					defaultValue="${this.props.data.skipUntil ?
						moment.unix(this.props.data.skipUntil).format("YYYY-MM-DD") : ""}"
					value="${this.state.skipUntil}" onChange=${this.onChangeSkipDate}/>
			</div>

			<button className="button button-primary" type="submit">Save</button>
		</form>`;
	}
}

const AlarmForm = ReactRedux.connect(null, { saveAlarm })(ConnectedAlarmForm);

export default AlarmForm

