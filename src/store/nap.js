export const SET_NAP_TIME = "SET_NAP_TIME";
export const SET_NAP_CLOCK = "SET_NAP_CLOCK";
export const SET_NAP_CLOCK_DELAY = "SET_NAP_CLOCK_DELAY";
//action
export const setNapTime = (payload) => {
  return {
    type: SET_NAP_TIME,
    payload,
  };
};
export const setNapClock = (payload) => {
  return {
    type: SET_NAP_CLOCK,
    payload,
  };
};
export const setNapClockDelay = (payload) => {
  return {
    type: SET_NAP_CLOCK_DELAY,
    payload,
  };
};
const init = {
  napTime: 0,
  napClock: true,
  napClockDelay: 300,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NAP_TIME:
      return { ...state, napTime: payload };
    case SET_NAP_CLOCK:
      return { ...state, napClock: payload };
    case SET_NAP_CLOCK_DELAY:
      return { ...state, napClockDelay: payload };
    default:
      return state;
  }
};
