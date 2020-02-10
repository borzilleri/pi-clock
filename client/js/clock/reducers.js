import { SET_STATE } from "../action-types.js";
import { STATUS_INACTIVE } from "../constants.js";

const initialState = {
  name: "",
  status: STATUS_INACTIVE,
  activationTime: -1,
};
function rootReducer(state = initialState, action) {
  if (action.type === SET_STATE) {
    return action.payload;
  }
  return state;
}
export default rootReducer;
