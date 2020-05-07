import { SET_APP_MODE } from "./mode";
import { START_MUSIC, PAUSE_MUSIC } from "./music";

//state 定时器的状态
export const PAUSE = "PAUSE";
export const PLAY = "PLAY";
export const FINISH = "FINISH";

//type

export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const FINISH_TIMER = "FINISH_TIMER";
export const TICK = "TICK";
export const SET_TARGET = "SET_TARGET";

//action
//开始计时
/**
 *
 * @param {{target, second=0}} payload
 */
export const startTimer = ({ target, mode }) => {
  return (dispatch, getState) => {
    const {
      timer: { second },
    } = getState();
    window.startTime = Date.now() - second * 1000;
    dispatch({ type: START_TIMER, payload: target }); //设置定时器
    dispatch({ type: SET_APP_MODE, payload: mode }); //设置应用模式
    dispatch({ type: START_MUSIC }); //开始音乐
  };
};
export const pauseTimer = () => {
  return (dispatch) => {
    dispatch({ type: PAUSE_TIMER });
    dispatch({ type: PAUSE_MUSIC });
  };
};
export const finishTimer = () => {
  return (dispatch) => {
    dispatch({ type: FINISH_TIMER });
    dispatch({ type: PAUSE_MUSIC });
  };
};
export const tick = () => {
  return (dispatch) => {
    const now = Date.now();
    const newSecond = ~~((now - window.startTime) / 1000);
    console.log(newSecond);
    dispatch({ type: TICK, payload: newSecond, startTime: now });
  };
};
const init = {
  second: 0, //走过的秒数
  target: Infinity, //目标时间
  state: FINISH,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_TIMER:
      return { ...state, target: payload, state: PLAY };
    case PAUSE_TIMER:
      return { ...state, state: PAUSE };
    case FINISH_TIMER:
      return {
        ...state,
        second: 0,
        target: Infinity,
        state: FINISH,
      };
    case TICK:
      return { ...state, second: payload };
    default:
      return state;
  }
};
