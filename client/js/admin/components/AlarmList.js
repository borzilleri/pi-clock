import html from '../../html.js';
import { toggleAlarmEnabled } from '../../actions.js';

const alarmRowDispatchToProps = {
	toggleAlarmEnabled
}
class ConnectedAlarmRow extends React.Component {
	constructor(props) {
		super(props);
		this.formatTime = this.formatTime.bind(this);
		this.formatDays = this.formatDays.bind(this);
		this.toggleEnabled = this.toggleEnabled.bind(this);
	}
	formatTime() {
		return moment({ hour: this.props.alarm.hour, minute: this.props.alarm.minute })
			.format('HH:mm');
	}
	formatDays() {
		return this.props.alarm.weekDay.sort().map(d => {
			const day = moment().day(d).format('ddd');
			return html`<span key=${d} className="label week-day">${day}</span> `
		});
	}
	toggleEnabled() {
		this.props.toggleAlarmEnabled(this.props.alarm);
	}
	render() {
		return html`
		<tr>
			<td>${this.props.alarm.name}</td>
			<td>${this.formatTime()}</td>
			<td>${this.formatDays()}</td>
			<td>
				<div className="onoffswitch">
					<input onChange=${this.toggleEnabled} type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="${this.props.alarm._id}-enabled" defaultChecked=${this.props.alarm.enabled}/>
					<label key=${this.props.alarm._id} className="onoffswitch-label" htmlFor="${this.props.alarm._id}-enabled"></label>
				</div>
			</td>
		</tr>
		`
	}
}
const AlarmRow = ReactRedux.connect(null, alarmRowDispatchToProps)(ConnectedAlarmRow);

const mapStateToProps = state => {
	console.log("updating alarm list state", state);
	return { alarms: state.alarms };
};
const ConnectedAlarmList = ({ alarms }) => (html`
	<table id="alarm-list">
		<thead>
			<tr>
				<th>Alarm Name</th>
				<th>Time</th>
				<th>Days</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
		${alarms.map(el => (html`<${AlarmRow} key=${el._id} alarm=${el}/>`))}
		</tbody>
	</table>
`);

const AlarmList = ReactRedux.connect(mapStateToProps)(ConnectedAlarmList);
export default AlarmList;
