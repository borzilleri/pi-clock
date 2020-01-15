import { ALARM_FETCHED, DEBUG_RESPONSE } from "./action-types.mjs";
import { STATUS_INACTIVE } from "./constants.mjs";

const initialState = {
  currentStatus: STATUS_INACTIVE,
  nextAlarm: null
};
function rootReducer(state = initialState, action) {
  console.log(`Catching ${action.type} in root reducer.`);
  if (action.type === ALARM_FETCHED) {
    return Object.assign({}, state, {
      nextAlarm: action.payload
    });
  }
  if (action.type === DEBUG_RESPONSE) {
    console.log("DEBUG_RESPONSE reducer:", action.payload);
  }
  return state;
}
export default rootReducer;
