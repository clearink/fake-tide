import React, { useEffect, useRef, useState, useCallback } from "react";
import "./app.css";
import { HashRouter as Router } from "react-router-dom";
import { renderRoutes, routes } from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { useMobileHackPlay } from "./utils/userHooks";
import { PLAY, tick, finishTimer } from "./store/timer";
import { FOCUS, SLEEP, NAP } from "./store/mode";
import { Toast } from "antd-mobile";
import { setFocusCount } from "./store/focus";
import ClockDrawer from "./components/ClockDrawer";
import TransitionSwitch from "./components/TransitionSwitch";
import { pauseMusic, setSoundList } from "./store/music";
import data from "./utils/data.json";
import Muse from "./pages/Explore/Muse";
const App = () => {
  const dispatch = useDispatch();
  const { second, target, state } = useSelector(({ timer }) => timer);
  const { canPlay, active, volume, soundList } = useSelector(
    ({ music }) => music
  );
  const { appMode } = useSelector(({ mode }) => mode);
  const sound = soundList[active] || {};
  const [finishMusic, setFinishMusic] = useState("notification");
  const [clockDrawerOpen, setClockDrawerOpen] = useState(false);
  const audioRef = useRef(null);
  const finishAudioRef = useRef(null);
  //notification vconsole
  useEffect(() => {
    if (!window.Notification) {
      console.error("不支持Notification通知");
    } else if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  //tick timer effect
  useEffect(() => {
    let timer;
    if (state === PLAY) timer = setInterval(() => dispatch(tick()), 1000);
    return () => clearInterval(timer);
  }, [dispatch, state]);

  //tomato settings
  useEffect(() => {
    if (second >= target) {
      dispatch(finishTimer());
      if (window.Notification) new Notification("计时结束啦");
      finishAudioRef.current.play();
      if (appMode === FOCUS) dispatch(setFocusCount());
      if (appMode === SLEEP || appMode === NAP) setClockDrawerOpen(true);
    }
    if (appMode === SLEEP || appMode === NAP) {
      //如果是上述类型,切换finishAudio为clock.mp3
      setFinishMusic("clock");
    } else if (!!appMode) {
      setFinishMusic("notification");
    }
  }, [appMode, dispatch, target, second]);

  useMobileHackPlay(); //移动端播放hack

  useEffect(() => {
    if (canPlay) audioRef.current.play();
    else audioRef.current.pause();
  }, [canPlay, sound]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const closeClockDrawer = useCallback(() => {
    setClockDrawerOpen(false);
    finishAudioRef.current.currentTime = 0;
    finishAudioRef.current.pause();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      //请求音乐
      if (!soundList.length) dispatch(setSoundList(data.slice(0, 20)));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, soundList]);
  return (
    <Router>
      <TransitionSwitch>{renderRoutes(routes)}</TransitionSwitch>
      <audio
        ref={finishAudioRef}
        src={`/static/audio/${finishMusic}.mp3`}
        className="audio"
        muted
      ></audio>
      <audio
        onError={() => Toast.fail("音频加载失败", 2, null, false)}
        onPause={() => dispatch(pauseMusic())}
        loop
        ref={audioRef}
        src={sound.demo_sound_url}
        className="audio"
        muted
      ></audio>
      <ClockDrawer visible={clockDrawerOpen} close={closeClockDrawer} />
      <Muse />
    </Router>
  );
};
export default App;
/**
 * 自己实现无缝轮播图
 */
