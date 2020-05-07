import React, { useCallback, memo, useMemo } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.scss";
import {
  motion,
  AnimateSharedLayout,
  AnimatePresence,
} from "framer-motion/dist/framer-motion";
import Drawer from "components/Drawer";
import { useSelector, useDispatch } from "react-redux";
import {
  changeMusic,
  startMusic,
  changeVolume,
  playPauseMusic,
} from "../../../sotre/music";
import { Slider } from "antd-mobile";
import { imageFormat } from "../../../constant";
function SoundDrawer(props) {
  const { visible, close } = props;
  const dispatch = useDispatch();
  const { active, volume, canPlay, soundList } = useSelector(
    ({ music }) => music
  );

  const handlePlayMusic = () => {
    dispatch(playPauseMusic());
  };
  const change = useCallback(
    (index) => {
      dispatch(changeMusic(index));
      dispatch(startMusic());
    },
    [dispatch]
  );
  const ele = (
    <AnimatePresence initial={false} exitBeforeEnter>
      {visible && (
        <motion.div
          className={style.sound_drawer}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <header>
            <i className="iconfont icon-close" onClick={close}></i>
            <p>声音场景</p>
          </header>
          <div className={style.sound_list}>
            <AnimateSharedLayout type="crossfade">
              {soundList.map((sound, i) => {
                return (
                  <div className={style.sound_item} key={sound.id}>
                    <div className={style.wrap} onClick={() => change(i)}>
                      <img
                        src={`${sound.cover_url}${imageFormat(180, 180)}`}
                        alt={sound?.["name"]?.["zh-Hans"]}
                      />
                      <AnimatePresence>
                        {i === active && (
                          <motion.i
                            layoutId="icon"
                            className="iconfont icon-sound"
                          ></motion.i>
                        )}
                      </AnimatePresence>
                    </div>
                    <p className={style.title}>
                      {sound?.["name"]?.["zh-Hans"]}
                    </p>
                  </div>
                );
              })}
            </AnimateSharedLayout>
          </div>
          <div className={style.music_bar}>
            <motion.i
              className={`iconfont icon-${canPlay ? "pause" : "play"}`}
              onClick={handlePlayMusic}
            ></motion.i>
            <div className={style.range}>
              <Slider
                value={volume * 100}
                handleStyle={{ touchAction: "none", border: "2px solid #ccc" }}
                trackStyle={{ backgroundColor: "#2c3e50" }}
                onChange={(volume) => dispatch(changeVolume(volume / 100))}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(ele, document.body);
}
export default memo(SoundDrawer);
