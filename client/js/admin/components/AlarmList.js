import html from '../../html.js';
import autoBind from '../../autoBind.js';
import { WEEK_DAYS } from '../../constants.js';
import { toggleAlarmEnabled, editAlarm, deleteAlarm } from '../actions.js';
import ToggleCheckbox from './ToggleCheckbox.js';

class ConnectedAlarmRow extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}
	formatDays() {
		return this.props.alarm.weekDays.sort()
			.map(d => html`<span key=${d} className="label week-day">${WEEK_DAYS[d]}</span>`);
	}
	toggleEnabled() {
		this.props.toggleAlarmEnabled(this.props.alarm);
	}
	/**
	 * @param {Event} e 
	 */
	editAlarm(e) {
		e.preventDefault();
		this.props.editAlarm(this.props.alarm);
	}
	/**
	 * @param {Event} e 
	 */
	deleteAlarm(e) {
		e.preventDefault();
		this.props.deleteAlarm(this.props.alarm._id);
	}
	render() {
		return html`
		<tr>
			<td>${this.props.alarm.name}</td>
			<td>${moment({ hour: this.props.alarm.hour, minute: this.props.alarm.minute }).format('hh:mm A')}</td>
			<td>${this.formatDays()}</td>
			<td><${ToggleCheckbox} id=${this.props.alarm._id} onChange=${this.toggleEnabled} 
				defaultChecked=${this.props.alarm.enabled}/></td>
			<td><a href="#" onClick=${this.editAlarm}>✏️</a></td>
			<td><a href="#" onClick=${this.deleteAlarm}>🗑</a></td>
		</tr>
		`
	}
}
const AlarmRow = ReactRedux.connect(null, { toggleAlarmEnabled, editAlarm, deleteAlarm })(ConnectedAlarmRow);


const mapStateToProps = (state) => {
	return { alarms: state.alarms };
};
const ConnectedAlarmList = ({ alarms, editAlarm }) => {
	alarms.sort((a,b) => a.name.localeCompare(b.name));
	return html`
	<table id="alarm-list">
		<thead>
			<tr>
				<th>Alarm Name</th>
				<th>Time</th>
				<th>Recurs On</th>
				<th></th>
				<th colSpan="2"><button className="button" onClick="${() => editAlarm()}">Add Alarm</button></th>
			</tr>
		</thead>
		<tbody>
		${alarms.map(el => (html`<${AlarmRow} key=${el._id} alarm=${el}/>`))}
		</tbody>
	</table>`;
}

const AlarmList = ReactRedux.connect(mapStateToProps, { editAlarm })(ConnectedAlarmList);
export default AlarmList;
