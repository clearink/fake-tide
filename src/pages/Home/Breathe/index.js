import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import style from "./style.module.scss";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  pageTransition,
  animateProps,
  fade,
  clockTransition,
} from "../../../constant/variants";
import { startMusic, pauseMusic } from "../../../sotre/music";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PickerView } from "antd-mobile";
import SoundDrawer from "../SoundDrawer";
import FinishDrawer from "../../../components/FinishDrawer";
import { BREATHE } from "../../../sotre/mode";
import { imageFormat } from "../../../constant";
export default function Breathe() {
  const { active, soundList } = useSelector(({ music }) => music);
  const dispatch = useDispatch();

  const audioRef = useRef(null);

  const sound = soundList[active] || {};

  const [breatheCount, setBreatheCount] = useState(0);
  const [count, setCount] = useState(0);
  const [play, setPlay] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);

  const controls = useAnimation();
  const [text, setText] = useState("放松身体");
  const data = useMemo(() => {
    return Array.from(new Array(15), (_, i) => ({
      label: String(i + 1).padStart(2, "0"),
      value: i + 1,
    }));
  }, []);
  const startBreate = () => {
    setCount(breatheCount);
    dispatch(startMusic());
    setPlay(true);
  };
  const endBreathe = () => {
    setPlay(false);
    dispatch(pauseMusic());
    controls.stop();
    setText("放松身体");
  };
  const changeBreatheTime = (data) => {
    setBreatheCount(data[0] * 12);
  };
  useEffect(() => {
    if (play && count === 0) {
      setFinishOpen(true);
    }
  }, [play, count]);

  useEffect(() => {
    let T;
    if (count === 0) {
      setPlay(false);
      setText("放松身体");
    } else if (count % 2) {
      setText("呼");
      controls.start({ scale: 1, transition: { duration: 4 } });
      T = setTimeout(() => setCount((_) => _ - 1), 4500);
    } else if (count % 2 === 0) {
      setText("吸");
      controls.start({ scale: 2, transition: { duration: 4 } });
      T = setTimeout(() => setCount((_) => _ - 1), 4500);
    }
    return () => clearTimeout(T);
  }, [dispatch, count, controls]);
  const finishDrawerClose = useCallback(() => {
    setFinishOpen(false);
  }, []);
  return (
    <motion.div
      {...animateProps}
      variants={pageTransition}
      className={style.breathe}
      style={{
        backgroundImage: `url(${sound.cover_url}${imageFormat(600, 600)})`,
      }}
    >
      <motion.div variants={fade} className={style.header}>
        <Link to="/home">
          <i className="iconfont icon-close"></i>
        </Link>
        <span>呼吸</span>
        <i className="iconfont icon-close"></i>
      </motion.div>
      <motion.div variants={clockTransition} className={style.clock}>
        <motion.div
          className={style.ball}
          animate={{
            scale: play ? 7 : 1,
          }}
          transition={{
            duration: 0.5,
          }}
        ></motion.div>
        <AnimatePresence initial={false} exitBeforeEnter>
          {!play ? (
            <motion.div key="clock" {...fade} className={style.select_time}>
              <PickerView
                value={[breatheCount / 12]}
                onChange={changeBreatheTime}
                data={data}
                cols={1}
                indicatorStyle={{ opacity: 0 }}
              />
              <span className={style.minute}>分钟</span>
            </motion.div>
          ) : (
            <motion.div {...fade} key="scale" className={style.breathe_text}>
              <motion.div className={style.breathe_ball} animate={controls}>
                {text}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={fade} className={style.action}>
        <div
          className={play ? style.btn_transparent : style.btn}
          onClick={() => {
            if (play) endBreathe();
            else startBreate();
          }}
        >
          {play ? "结束" : " 开始呼吸"}
        </div>
      </motion.div>
      <motion.div variants={fade} className={style.tool_bar}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {!play ? (
            <motion.div key="breathe_mode" {...fade} className={style.wrap}>
              <div className={style.mode}>
                <i className="iconfont icon-infinite"></i>
                <span>平衡呼吸</span>
              </div>
              <div className={style.mode} onClick={() => setSoundOpen(true)}>
                <i className="iconfont icon-sound"></i>
                <span>{sound.name?.["zh-Hans"]}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="one"
              {...fade}
              className={style.mode}
              onClick={() => setSoundOpen(true)}
            >
              <i className="iconfont icon-sound"></i>
              <span>{sound.name?.["zh-Hans"]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <SoundDrawer visible={soundOpen} close={() => setSoundOpen(false)} />
      <FinishDrawer
        visible={finishOpen}
        close={finishDrawerClose}
        type={BREATHE}
        duration={breatheCount / 12}
      />
      <audio src={undefined} ref={audioRef}></audio>
    </motion.div>
  );
}
/**
 * breathe页面有一个专门的audio标签
 */
