//type
export const SET_FBREATHE_TIME = "SET_FBREATHE_TIME";

//action
export const setBreatheTime = (payload) => {
  return {
    type: SET_FBREATHE_TIME,
    payload,
  };
};
const init = {
  breatheTime: 0,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FBREATHE_TIME:
      return { ...state, breatheTime: payload };
    default:
      return state;
  }
};
