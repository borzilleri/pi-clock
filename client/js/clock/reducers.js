import { SET_STATE, SETTINGS_SET } from "../action-types.js";
import { STATUS_INACTIVE } from "../constants.js";
import { updateObject } from '../utils.js';

const initialState = {
  alarm: {
    name: "",
    status: STATUS_INACTIVE,
    activationTime: -1
  },
  settings: {
    timeZone: "UTC"
  }
};

function rootReducer(state = initialState, action) {
  if (action.type === SETTINGS_SET) {
    return updateObject(state, { settings: action.payload });

  }
  else if (action.type === SET_STATE) {
    return updateObject(state, { alarm: action.payload });
  }
  return state;
}
export default rootReducer;
