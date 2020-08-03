//mode

//type
export const SET_SLEEP_TIME = "SET_SLEEP_TIME";
export const SET_SLEEP_CLOCK = "SET_SLEEP_CLOCK";
export const SET_SLEEP_CLOCK_DELAY = "SET_SLEEP_CLOCK_DELAY";
//action
export const setSleepTime = (payload) => {
  return {
    type: SET_SLEEP_TIME,
    payload,
  };
};
export const setSleepClock = (payload) => {
  return {
    type: SET_SLEEP_CLOCK,
    payload,
  };
};
export const setSleepClockDelay = (payload) => {
  return {
    type: SET_SLEEP_CLOCK_DELAY,
    payload,
  };
};
const init = {
  sleepTime: ~~(Date.now() / 60000) * 60000, //确保整分
  sleepClock: true,
  sleepClockDelay: 300,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SLEEP_TIME:
      return { ...state, sleepTime: payload };
    case SET_SLEEP_CLOCK:
      return { ...state, sleepClock: payload };
    case SET_SLEEP_CLOCK_DELAY:
      return { ...state, sleepClockDelay: payload };
    default:
      return state;
  }
};
