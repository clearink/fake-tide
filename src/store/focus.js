//mode
export const TIMER_MODE = "TIMER_MODE"; //倒计时模式
export const EFFICIENT_MODE = "EFFICIENT_MODE"; //番茄工作法
export const INFINITE_MODE = "INFINITE_MODE"; //正向计时

//type
export const SET_FOCUS_MODE = "SET_FOCUS_MODE";
export const SET_FOCUS_TIME = "SET_FOCUS_TIME";
export const SET_FOCUS_COUNT = "SET_FOCUS_COUNT";

//action
export const setFocusMode = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_FOCUS_MODE, payload });
    dispatch({ type: SET_FOCUS_COUNT, payload: 1 });
  };
};
export const setFocusTime = (payload) => {
  return {
    type: SET_FOCUS_TIME,
    payload,
  };
};
export const setFocusCount = (payload) => {
  return (dispatch, getState) => {
    const {
      focus: { focusCount },
    } = getState();
    dispatch({
      type: SET_FOCUS_COUNT,
      payload: payload === undefined ? focusCount + 1 : payload,
    });
  };
};
const init = {
  focusMode: TIMER_MODE,
  focusTime: 0,
  focusCount: 1,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_FOCUS_MODE:
      return { ...state, focusMode: payload };
    case SET_FOCUS_TIME:
      return { ...state, focusTime: payload };
    case SET_FOCUS_COUNT:
      return { ...state, focusCount: payload };
    default:
      return state;
  }
};
