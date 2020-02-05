import { ALARM_LIST_RESPONSE, ALARM_SAVE_RESPONSE, ALARM_DELETE_RESPONSE, ALARM_EDIT, MODAL_CLOSE, SOUND_FETCH_RESPONSE } from '../action-types.js';
import { MODAL_OFF, MODAL_ALARM_FORM } from '../constants.js';

function updateObject(oldObject, objectUpdate) {
	return Object.assign({}, oldObject, objectUpdate);
}

function updateItemInArray(array, itemId, cb) {
	return array.map(item => item._id === itemId ? cb(item) : item);
}


function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action);
		}
		else {
			return state;
		}
	}
}

// Sounds Reducer
const soundInitialState = {
	sounds: ['Droplets'],
	default: 'Droplets'
}
function setSounds(soundState, action) {
	return action.payload;
}

const soundsReducer = createReducer(soundInitialState, {
	[SOUND_FETCH_RESPONSE]: setSounds
});

// Alarms Reducer
const alarmInitialState = [];

function setAlarms(alarmState, action) {
	return action.payload;
}

function setOneAlarm(alarmState, action) {
	let newAlarms;
	if (alarmState.find(a => a._id === action.payload._id)) {
		newAlarms = updateItemInArray(alarmState, action.payload._id, _ => action.payload);
	}
	else {
		newAlarms = alarmState.slice(0);
		newAlarms.push(action.payload);
	}
	return newAlarms;
}

function deleteAlarm(alarmState, action) {
	return alarmState.filter(a => a._id !== action.payload);
}

const alarmsReducer = createReducer(alarmInitialState, {
	[ALARM_LIST_RESPONSE]: setAlarms,
	[ALARM_SAVE_RESPONSE]: setOneAlarm,
	[ALARM_DELETE_RESPONSE]: deleteAlarm,
});

// Modal Reducer
const modalInitialState = {
	type: MODAL_OFF,
	data: undefined,
};

function openAlarmEditor(modalState, action) {
	return {
		type: MODAL_ALARM_FORM,
		data: action.payload
	}
}

function closeAlarmEditor(editorState, action) {
	return {
		type: MODAL_OFF,
		data: undefined
	}
}

const editorReducer = createReducer(modalInitialState, {
	[ALARM_EDIT]: openAlarmEditor,
	[ALARM_SAVE_RESPONSE]: closeAlarmEditor,
	[MODAL_CLOSE]: closeAlarmEditor
});

// App Reducer

const appReducer = Redux.combineReducers({
	alarms: alarmsReducer,
	sounds: soundsReducer,
	modal: editorReducer,
})
export default appReducer;
