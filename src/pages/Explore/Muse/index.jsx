import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import ReactDom from "react-dom";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setMuseVisible, setMuseState } from "../../../sotre/muse";
import {
  pageTransition,
  animateProps,
  clockTransition,
  fade,
} from "../../../constant/variants";
import { imageFormat } from "../../../constant";
import { FINISH, PAUSE, PLAY } from "../../../sotre/timer";
import SoundDrawer from "../../Home/SoundDrawer";
function Muse(props) {
  const { soundList, active: soundActive } = useSelector(({ music }) => music);
  const { museVisible, museList, active: museActive, state } = useSelector(
    ({ muse }) => muse
  );
  const dispatch = useDispatch();
  const museAudioRef = useRef();
  const [second, setSecond] = useState(0);
  const [soundOpen, setSoundOpen] = useState(false);

  const muse = museList[museActive] || {};
  const sound = soundList[soundActive] || {};
  const closeMuse = () => dispatch(setMuseVisible(false));

  const handleStartMuse = () => {
    window.startMuse = Date.now() - second * 1000;
    dispatch(setMuseState(PLAY));
  };
  const handlePauseMuse = () => {
    dispatch(setMuseState(PAUSE));
  };
  const handleEndMuse = () => {
    setSecond(0);
    dispatch(setMuseState(FINISH));
    museAudioRef.current.currentTime = 0;
  };
  useEffect(() => {
    let timer;
    if (state === PLAY) {
      museAudioRef.current.play();
      timer = setInterval(() => {
        setSecond(() => ~~((Date.now() - window.startMuse) / 1000));
      }, 1000);
    } else {
      museAudioRef.current.pause();
    }
    return () => clearInterval(timer);
  }, [state]);
  useEffect(() => {
    if (second >= 180) dispatch(setMuseState(FINISH));
  }, [second, dispatch]);
  useEffect(handleEndMuse, [museActive]);

  const soundDrawerClose = useCallback(() => setSoundOpen(false), []);
  const ele = (
    <AnimatePresence initial={false}>
      {museVisible && (
        <motion.div
          key="muse"
          {...animateProps}
          variants={pageTransition}
          className={style.muse}
          style={{
            backgroundImage: `url(${sound.cover_url}${imageFormat(800, 800)})`,
          }}
        >
          <motion.header variants={fade} className={style.header}>
            <i className="iconfont icon-close" onClick={closeMuse}></i>
            <p className={style.name}></p>
            <i className="iconfont icon-close"></i>
          </motion.header>
          <motion.div variants={clockTransition} className={style.main}>
            <div className={style.muse_name}>{muse.name?.["zh-Hans"]}</div>
            <span>{second}</span>
            <p className={style.select}>
              {muse.duration_description?.["zh-Hans"]}
            </p>
          </motion.div>
          <motion.div variants={fade} className={style.action}>
            <AnimatePresence initial={false} exitBeforeEnter>
              {state === FINISH && (
                <motion.i
                  key="finish"
                  {...fade}
                  className={`iconfont icon-play ${style.icon} ${style.play}`}
                  onClick={handleStartMuse}
                ></motion.i>
              )}
              {state === PLAY && (
                <motion.i
                  key="play"
                  {...fade}
                  className={`iconfont icon-pause ${style.icon} ${style.pause}`}
                  onClick={handlePauseMuse}
                ></motion.i>
              )}
              {state === PAUSE && (
                <motion.div key="pause" className={style.group}>
                  <motion.i
                    initial={{ x: "3.2rem", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "3.2rem", opacity: 0 }}
                    transition={{ ease: "easeInOut" }}
                    className={`iconfont icon-play ${style.icon} ${style.play}`}
                    onClick={handleStartMuse}
                  ></motion.i>
                  <motion.i
                    initial={{ x: "-3rem", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-3rem", opacity: 0 }}
                    transition={{ ease: "easeInOut" }}
                    className={`iconfont icon-end ${style.icon}  ${style.end}`}
                    onClick={handleEndMuse}
                  ></motion.i>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.footer variants={fade} className={style.footer}>
            <div className={style.sound_change}>
              <i className="iconfont icon-user"></i>
              <span>冥想声音</span>
            </div>
            <div
              className={style.sound_change}
              onClick={() => setSoundOpen(true)}
            >
              <i className="iconfont icon-sound"></i>
              <span>声音场景</span>
            </div>
          </motion.footer>
        </motion.div>
      )}
      {state !== FINISH && !museVisible && (
        <motion.div
          initial={{
            x: "1rem",
            scale: 0,
          }}
          animate={{
            x: 0,
            scale: 1,
          }}
          exit={{
            x: "1rem",
            scale: 0,
          }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          key="thumbnail"
          className={style.thumbnail}
          onClick={() => dispatch(setMuseVisible(true))}
        >
          <i className="iconfont icon-sound"></i>
        </motion.div>
      )}
      )}
      <SoundDrawer
        key="sound-drawer"
        visible={soundOpen}
        close={soundDrawerClose}
      />
      <audio
        key="audio"
        src={muse.sections?.[0]?.demo_sound_url_mp3?.["zh"]}
        ref={museAudioRef}
        muted
        loop
        className="audio"
      ></audio>
    </AnimatePresence>
  );
  return ReactDom.createPortal(ele, document.body);
}
export default memo(Muse);
