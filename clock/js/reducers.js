import { SET_STATE, DEBUG_RESPONSE } from "/shared/action-types.js";
import { STATUS_INACTIVE } from "/shared/constants.js";

const initialState = {
  name: "",
  status: STATUS_INACTIVE,
  activationTime: -1,
};
function rootReducer(state = initialState, action) {
  console.log(`Catching ${action.type} in root reducer.`);
  if (action.type === SET_STATE) {
    return action.payload;
  }
  if (action.type === DEBUG_RESPONSE) {
    console.log("DEBUG_RESPONSE reducer:", action.payload);
  }
  return state;
}
export default rootReducer;
