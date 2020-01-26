import * as Actions from '../action-types.js';

const initialState = {
	alarms: []
};

function buildNewState(state, stateUpdate) {
	return Object.assign({}, state, stateUpdate);
}

function rootReducer(state = initialState, action) {
	if (action.type === Actions.ALARM_SET_ALL) {
		return buildNewState(state, {
			alarms: action.payload
		});
	}
	if (action.type === Actions.ALARM_SET_ONE) {
		let newAlarms = state.alarms.map(a => {
			return a._id === action.payload._id ? action.payload : a;
		});
		return buildNewState(state, {
			alarms: newAlarms
		});
	}
	return state;
}
export default rootReducer;
