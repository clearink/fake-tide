import { FINISH } from "./timer";

//type
export const SET_MUSE_VISIBLE = "SET_MUSE_VISIBLE";
export const SET_MUSE_LIST = "SET_MUSE_LIST";
export const SET_MUSE_ACTIVE = "SET_MUSE_ACTIVE";
export const SET_MUSE_STATE = "SET_MUSE_STATE";

//action
export const setMuseVisible = (payload) => {
  return {
    type: SET_MUSE_VISIBLE,
    payload,
  };
};
export const setMuseList = (payload) => {
  return {
    type: SET_MUSE_LIST,
    payload,
  };
};
export const setMuseActive = (payload) => {
  return {
    type: SET_MUSE_ACTIVE,
    payload,
  };
};
export const setMuseState = (payload) => {
  return {
    type: SET_MUSE_STATE,
    payload,
  };
};

const init = {
  state: FINISH,
  museVisible: false,
  museList: [],
  active: 0,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MUSE_VISIBLE:
      return { ...state, museVisible: payload };
    case SET_MUSE_LIST:
      return { ...state, museList: payload };
    case SET_MUSE_ACTIVE:
      return { ...state, active: payload };
    case SET_MUSE_STATE:
      return { ...state, state: payload };
    default:
      return state;
  }
};
