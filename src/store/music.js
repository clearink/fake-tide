//type
export const START_MUSIC = "START_MUSIC";
export const PAUSE_MUSIC = "PAUSE_MUSIC";
export const PLAY_PAUSE_MUSIC = "PLAY_PAUSE_MUSIC";
export const SET_SOUND_LIST = "SET_SOUND_LIST";
export const CHANGE_MUSIC = "CHANGE_MUSIC";
export const CHANGE_VOLUME = Symbol();

//action
export const startMusic = (payload) => {
  return {
    type: START_MUSIC,
    payload,
  };
};
export const pauseMusic = (payload) => {
  return {
    type: PAUSE_MUSIC,
    payload,
  };
};
export const changeMusic = (payload) => {
  return {
    type: CHANGE_MUSIC,
    payload,
  };
};
export const playPauseMusic = (payload) => {
  return {
    type: PLAY_PAUSE_MUSIC,
    payload,
  };
};
export const setSoundList = (payload) => {
  return {
    type: SET_SOUND_LIST,
    payload,
  };
};
export const changeVolume = (payload) => {
  localStorage.setItem("volume", payload);
  return {
    type: CHANGE_VOLUME,
    payload,
  };
};
const init = {
  active: 0,
  canPlay: false,
  soundList: [],
  volume: localStorage.getItem("volume") ? localStorage.getItem("volume") : 1,
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_MUSIC:
      return { ...state, canPlay: true };
    case PAUSE_MUSIC:
      return { ...state, canPlay: false };
    case PLAY_PAUSE_MUSIC:
      return { ...state, canPlay: !state.canPlay };
    case SET_SOUND_LIST:
      return { ...state, soundList: payload };
    case CHANGE_MUSIC:
      return { ...state, active: payload };
    case CHANGE_VOLUME:
      return { ...state, volume: payload };
    default:
      return state;
  }
};
