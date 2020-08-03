import React, { useState, useCallback, useMemo } from "react";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PickerView } from "antd-mobile";
import { useSelector, useDispatch } from "react-redux";
import { FINISH, PLAY, startTimer, finishTimer } from "../../../store/timer";
import { setNapTime, setNapClock, setNapClockDelay } from "../../../store/nap";
import { NAP } from "../../../store/mode";
import { vibrate, calcCurrentTime } from "utils";
import {
  pageTransition,
  animateProps,
  fade,
  clockTransition,
} from "../../../constant/variants";
import { usePress } from "utils/userHooks";
import Progress from "components/Progress";
import SoundDrawer from "../SoundDrawer";
import Drawer from "components/Drawer";
import { imageFormat } from "../../../constant";
export default function Nap() {
  const { state } = useSelector(({ timer }) => timer);
  const { napTime, napClock, napClockDelay } = useSelector(({ nap }) => nap);
  const { active, soundList } = useSelector(({ music }) => music);
  const dispatch = useDispatch();

  const sound = soundList[active] || {};
  const [soundOpen, setSoundOpen] = useState(false);
  const [clockTimeDelayOpen, setClockTimeDelayOpen] = useState(false);

  const data = useMemo(() => {
    return Array.from(new Array(18), (_, i) => ({
      label: (i + 1) * 10,
      value: (i + 1) * 10,
    }));
  }, []);
  const pickerChange = (date) => {
    dispatch(setNapTime(date[0] * 60));
  };
  const startNap = () => {
    dispatch(startTimer({ target: napTime, mode: NAP }));
  };
  const endNap = useCallback(() => dispatch(finishTimer()), [dispatch]);

  const [down, setDown, percent] = usePress(vibrate, endNap);
  const currentTime = calcCurrentTime();

  const clockTime = useMemo(() => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + napTime);
    return [
      String(now.getHours()).padStart(2, "0"),
      String(now.getMinutes()).padStart(2, "0"),
    ];
  }, [napTime]);
  const handleSetNapClockDelay = (time) => {
    dispatch(setNapClockDelay(time));
    setClockTimeDelayOpen(false);
  };
  const closeClockTimeDelayDrawer = useCallback(
    () => setClockTimeDelayOpen(false),
    []
  );
  const toggleNapClock = () => {
    dispatch(setNapClock(!napClock));
  };
  return (
    <motion.div
      {...animateProps}
      variants={pageTransition}
      className={style.nap}
      style={{
        backgroundImage: `url(${sound.cover_url}${imageFormat(600, 600)})`,
      }}
    >
      <motion.div variants={fade} className={style.header}>
        <Link to="/home">
          <i className="iconfont icon-close"></i>
        </Link>
        <span>小憩</span>
        <i className="iconfont icon-close"></i>
      </motion.div>
      <motion.div variants={clockTransition} className={style.clock}>
        <div
          className={style.nap_circle}
          style={{
            animationPlayState: state === PLAY ? "running" : "paused",
          }}
        ></div>
        <AnimatePresence initial={false} exitBeforeEnter>
          {state === FINISH ? (
            napClock ? (
              <motion.div
                key="nap_time"
                {...fade}
                className={style.select_time}
              >
                <PickerView
                  value={[napTime / 60]}
                  onChange={pickerChange}
                  data={data}
                  cols={1}
                  indicatorStyle={{ opacity: 0 }}
                />
                <p className={style.minute}>分钟</p>
                <p className={style.time}>
                  闹钟将于{clockTime[0]}:{clockTime[1]}响起
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="clock_close"
                {...fade}
                className={style.clock_close}
              >
                <p>闹钟已关闭</p>
              </motion.div>
            )
          ) : (
            <motion.div
              className={style.current_time}
              key="current_time"
              {...fade}
            >
              <p>{currentTime[0]}</p>
              <p>{currentTime[1]}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={fade} className={style.action}>
        <AnimatePresence initial={false} exitBeforeEnter>
          {state === FINISH ? (
            <motion.i
              key="sun"
              {...clockTransition}
              className="iconfont icon-sun"
              onClick={startNap}
            ></motion.i>
          ) : (
            <motion.div
              key="pause"
              {...clockTransition}
              className={style.pause}
            >
              <motion.div
                initial={false}
                animate={{ opacity: down ? 1 : 0 }}
                style={{ width: "100%", marginBottom: "1rem" }}
              >
                <Progress percent={percent} />
              </motion.div>
              <i
                className="iconfont icon-pause"
                onTouchStart={() => setDown(true)}
                onTouchEnd={() => setDown(false)}
                onTouchCancel={() => setDown(false)}
              ></i>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={fade} className={style.tool_bar}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH ? (
            <motion.div key="container" {...fade} className={style.container}>
              <div className={style.wrap} onClick={toggleNapClock}>
                <i className="iconfont icon-clock"></i>
                <span>闹钟{napClock ? "开" : "关"}</span>
              </div>
              <div
                className={style.wrap}
                onClick={() => setClockTimeDelayOpen(true)}
              >
                <i className="iconfont icon-shalou"></i>
                <span>5分钟</span>
              </div>
              <div className={style.wrap} onClick={() => setSoundOpen(true)}>
                <i className="iconfont icon-sound"></i>
                <span>{sound.name?.["zh-Hans"]}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sound"
              {...fade}
              className={style.wrap}
              onClick={() => setSoundOpen(true)}
            >
              <i className="iconfont icon-sound"></i>
              <span>{sound.name?.["zh-Hans"]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <SoundDrawer visible={soundOpen} close={() => setSoundOpen(false)} />
      <Drawer
        visible={clockTimeDelayOpen}
        close={closeClockTimeDelayDrawer}
        contentStyle={{
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          paddingBottom: "1rem",
          height: "40vh",
        }}
        title={<p className={style.focus_mode_title}>闹钟延迟</p>}
      >
        {Array.from(Array(36), (_, i) => (i + 1) * 5).map((item) => (
          <div
            key={item}
            className={style.delay_time_item}
            onClick={() => handleSetNapClockDelay(item * 60)}
          >
            {napClockDelay === item * 60 && (
              <i className={`iconfont icon-yes ${style.icon_choice}`}></i>
            )}
            {String(item).padStart(2, "0")} 分钟
          </div>
        ))}
      </Drawer>
    </motion.div>
  );
}
