import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { PickerView } from "antd-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Drawer from "components/Drawer";
import Ring from "components/Ring";
import {
  setFocusMode,
  setFocusTime,
  setFocusCount,
  EFFICIENT_MODE,
  INFINITE_MODE,
} from "../../../sotre/focus";
import {
  PLAY,
  FINISH,
  PAUSE,
  startTimer,
  pauseTimer,
  finishTimer,
} from "../../../sotre/timer";
import { FOCUS } from "../../../sotre/mode";
import { formateTime } from "../../../utils";
import {
  focusModeList,
  FocusModeToText,
  FocusModeToIcon,
  showFinishPageMinTime,
  tomatoSettings,
  imageFormat,
} from "../../../constant";
import {
  pageTransition,
  animateProps,
  fade,
  clockTransition,
  focus_fade_btn_left,
  focus_fade_btn_right,
} from "../../../constant/variants";
import SoundDrawer from "../SoundDrawer";
import FinishDrawer from "../../../components/FinishDrawer";
export default function Focus(props) {
  const dispatch = useDispatch();
  const { focusMode, focusTime, focusCount } = useSelector(
    ({ focus }) => focus
  );
  const { second, target, state } = useSelector(({ timer }) => timer);
  const { active, soundList } = useSelector(({ music }) => music);
  const sound = soundList[active] || {};
  const [focusModeOpen, setFocusModeOpen] = useState(false);
  const [soundOpen, setSoundOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  const relax = useMemo(() => {
    return focusCount % 2 === 0 && focusMode === EFFICIENT_MODE;
  }, [focusCount, focusMode]);
  const lastSecond = useRef(0);

  //openFinish?
  useEffect(() => {
    if (state === FINISH && lastSecond.current >= showFinishPageMinTime) {
      setFinishOpen(true);
    } else {
      lastSecond.current = second;
    }
  }, [state, second]);
  //set relax time
  useEffect(() => {
    if (focusMode !== EFFICIENT_MODE) return;
    if (focusCount % 2) {
      dispatch(setFocusTime(tomatoSettings.FocusTime));
    } else if (focusCount % 8 === 0) {
      dispatch(setFocusTime(tomatoSettings.LongRelax));
    } else {
      dispatch(setFocusTime(tomatoSettings.ShortRelax));
    }
  }, [dispatch, focusCount, focusMode]);
  const data = useMemo(() => {
    return Array.from(new Array(36), (_, i) => ({
      label: (i + 1) * 5,
      value: (i + 1) * 5,
    }));
  }, []);

  const focusTimeChange = (select) => {
    dispatch(setFocusTime(select[0] * 60));
  };
  const timeStart = () => {
    dispatch(
      startTimer({
        target: focusMode === INFINITE_MODE ? Infinity : focusTime,
        mode: FOCUS,
      })
    );
  };
  const timePause = () => {
    dispatch(pauseTimer());
  };
  const timeEnd = () => {
    dispatch(finishTimer());
    dispatch(setFocusCount(1));
  };
  const drawerChange = (type) => {
    dispatch(setFocusMode(type));
    setFocusModeOpen(false);
  };

  const finishDrawerClose = useCallback(() => setFinishOpen(false), []);
  const soundDrawerClose = useCallback(() => setSoundOpen(false), []);
  const focusModeDrawerClose = useCallback(() => setFocusModeOpen(false), []);

  return (
    <motion.div
      {...animateProps}
      variants={pageTransition}
      className={`${style.focus} ${relax && style.relax}`}
      style={{
        backgroundImage: `url(${sound.cover_url}${imageFormat(600, 600)})`,
      }}
    >
      <motion.div variants={fade} className={style.header}>
        <Link to="/home">
          <i className="iconfont icon-close"></i>
        </Link>
        <span>专注</span>
        <i className="iconfont icon-close"></i>
      </motion.div>
      <motion.div variants={clockTransition} className={style.clock}>
        <Ring
          style={{ position: "absolute" }}
          rate={second / target}
          radius={110}
          color="#ecf0f1"
        />
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH && focusMode !== INFINITE_MODE ? (
            <motion.div {...fade} className={style.select_time}>
              <PickerView
                value={[focusTime / 60]}
                onChange={focusTimeChange}
                data={data}
                cols={1}
                indicatorStyle={{ opacity: 0 }}
              />
              <span className={style.minute}>分钟</span>
            </motion.div>
          ) : (
            <motion.p key="countdown" {...fade} className={style.count_down}>
              {focusMode === INFINITE_MODE
                ? formateTime(second)
                : formateTime(target - second)}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={fade} className={style.action}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH && (
            <motion.span
              key="finish"
              {...fade}
              className={style.btn}
              onClick={timeStart}
            >
              {relax ? "放松一下" : "开始专注"}
            </motion.span>
          )}
          {state === PAUSE && (
            <>
              <motion.span
                {...focus_fade_btn_left}
                className={style.btn}
                onClick={timeStart}
              >
                继续
              </motion.span>
              <motion.span
                {...focus_fade_btn_right}
                className={style.btn_transparent}
                onClick={timeEnd}
              >
                结束
              </motion.span>
            </>
          )}
          {state === PLAY && (
            <motion.div
              key="play"
              {...fade}
              className={style.btn_transparent}
              onClick={timePause}
            >
              暂停
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={fade} className={style.tool_bar}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH ? (
            <motion.div key="two" {...fade} className={style.wrap}>
              <div
                className={style.mode}
                onClick={() => setFocusModeOpen(true)}
              >
                <i
                  className={`iconfont icon-${FocusModeToIcon[focusMode]}`}
                ></i>
                <span>{FocusModeToText[focusMode]}</span>
              </div>
              <div className={style.mode} onClick={() => setSoundOpen(true)}>
                <i className="iconfont icon-sound"></i>
                <span>{sound["name"]?.["zh-Hans"]}</span>
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
              <span>{sound["name"]?.["zh-Hans"]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Drawer
        visible={focusModeOpen}
        close={focusModeDrawerClose}
        contentStyle={{
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          paddingBottom: "1rem",
        }}
        title={<p className={style.focus_mode_title}>专注模式</p>}
      >
        {focusModeList.map(({ mode, icon, title, color, intro }) => (
          <div
            key={mode}
            className={style.sidebar_item}
            onClick={() => drawerChange(mode)}
          >
            <i className={`iconfont icon-${icon}`} style={{ color }}></i>
            {mode === focusMode && (
              <i className={`iconfont icon-yes ${style.icon_choice}`}></i>
            )}
            <div className={style.mode_intro}>
              <p>{title}</p>
              <span>{intro}</span>
            </div>
          </div>
        ))}
      </Drawer>
      <FinishDrawer
        visible={finishOpen && (relax || focusMode !== EFFICIENT_MODE)}
        close={finishDrawerClose}
        type={FOCUS}
        typeName={FocusModeToText[focusMode]}
        duration={(lastSecond.current / 60) | 0}
      />

      <SoundDrawer visible={soundOpen} close={soundDrawerClose} />
    </motion.div>
  );
}
