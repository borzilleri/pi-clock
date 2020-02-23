export const API_ERROR = "api-error";

// These events are used by the Admin App for CRUD ops on alarms.
export const MODAL_CLOSE = "modal/close";

export const ALARM_EDIT = "alarm/edit";

export const ALARM_LIST_REQUEST = "alarm/list/request";
export const ALARM_LIST_RESPONSE = "alarm/list/response";

export const ALARM_SAVE_REQUEST = "alarm/save/request";
export const ALARM_SAVE_RESPONSE = "alarm/save/response";

export const ALARM_DELETE_REQUEST = "alarm/delete/request";
export const ALARM_DELETE_RESPONSE = "alarm/delete/response";

export const SOUND_FETCH_REQUEST = "sounds/fetch/request";
export const SOUND_FETCH_RESPONSE = "sounds/fetch/response";

// These are used by the Clock App.
export const ALARM_ACTIVATED = "alarm/activated";
export const SET_STATE = 'init-state';
export const SERVER_MESSAGE = 'server-message';
export const ALARM_SNOOZE = 'alarm-snooze';
export const ALARM_STOP = 'alarm-stop';

// These are mostly server-side events.
export const STATE_REQUEST = 'state/request';
export const STATE_RESPONSE = 'state/response';
export const SETTINGS_SET = 'settings/set';

export const ALARM_UPDATED = 'ALARM_UPDATED';
export const ALARM_DELETED = 'ALARM_DELETED';
export const ALARM_JOB_ACTIVATED = 'ALARM_JOB_ACTIVATED';
export const ALARM_JOB_COMPLETED = 'ALARM_JOB_COMPLETED';
