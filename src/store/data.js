//type
export const SET_SOUND_LIST = "SET_SOUND_LIST";

//action
export const setSoundList = (payload) => {
  console.log("mock data");
  return {
    type: SET_SOUND_LIST,
    payload,
  };
};

const init = {
  soundList: [],
};
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SOUND_LIST:
      return { ...state, soundList: payload };
    default:
      return state;
  }
};
