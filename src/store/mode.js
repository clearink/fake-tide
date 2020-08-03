export const FOCUS = "FOCUS"; //专注
export const SLEEP = "SLEEP"; //睡眠
export const NAP = "NAP"; //小憩
export const BREATHE = "BREATHE"; //呼吸
export const MUSE = "MUSE"; //冥想

export const SET_APP_MODE = "SET_APP_MODE";

export const setAppMode = (payload) => {
  return {
    type: SET_APP_MODE,
    payload,
  };
};
const init = {
  appMode: null,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_APP_MODE:
      return { appMode: payload };
    default:
      return state;
  }
};
