import React, { useMemo, useCallback, useState } from "react";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { DatePickerView } from "antd-mobile";
import enUs from "antd-mobile/lib/date-picker-view/locale/en_US";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Progress from "components/Progress";
import Drawer from "components/Drawer";
import { vibrate, calcCurrentTime } from "utils";
import { SLEEP } from "../../../sotre/mode";
import { FINISH, startTimer, finishTimer } from "../../../sotre/timer";
import {
  setSleepTime,
  setSleepClock,
  setSleepClockDelay,
} from "../../../sotre/sleep";
import {
  pageTransition,
  fade,
  clockTransition,
  btnFade,
  animateProps,
} from "../../../constant/variants";
import { usePress } from "utils/userHooks";
import SoundDrawer from "../SoundDrawer";
import { imageFormat } from "../../../constant";
function Sleep(props) {
  const { sleepTime, sleepClock, sleepClockDelay } = useSelector(
    ({ sleep }) => sleep
  );
  const { state } = useSelector(({ timer }) => timer);
  const { active, soundList } = useSelector(({ music }) => music);
  const sound = soundList[active] || {};
  const dispatch = useDispatch();

  const [soundOpen, setSoundOpen] = useState(false);
  const [clockTimeDelayOpen, setClockTimeDelayOpen] = useState(false);

  const endSleep = useCallback(() => dispatch(finishTimer()), [dispatch]);
  const [down, setDown, percent] = usePress(vibrate, endSleep);
  const startSleep = () => {
    dispatch(startTimer({ target: calcTime(sleepTime), mode: SLEEP }));
  };

  const changeTime = (date) => {
    dispatch(setSleepTime(date.getTime()));
  };

  const closeSoundDrawer = useCallback(() => setSoundOpen(false), []);
  const handleSetSleepClockDelay = (time) => {
    dispatch(setSleepClockDelay(time));
    setClockTimeDelayOpen(false);
  };
  const closeClockTimeDelayDrawer = useCallback(
    () => setClockTimeDelayOpen(false),
    []
  );
  const toggleSleepClock = () => {
    dispatch(setSleepClock(!sleepClock));
  };
  const [hour, minute] = useMemo(() => {
    const diff = calcTime(sleepTime, true);
    const hour = String(~~(diff / 3600)).padStart(2, "0");
    const minute = String(~~((diff - hour * 3600) / 60)).padStart(2, "0");
    return [hour, minute];
  }, [sleepTime]);
  const currentTime = calcCurrentTime();

  return (
    <motion.div
      {...animateProps}
      variants={pageTransition}
      className={style.sleep}
      style={{
        backgroundImage: `url(${sound.cover_url}${imageFormat(600, 600)})`,
      }}
    >
      <motion.div variants={fade} className={style.header}>
        <Link to="/home">
          <i className="iconfont icon-close"></i>
        </Link>
        <span className={style.text}>睡眠</span>
        <i className="iconfont icon-close"></i>
      </motion.div>
      <motion.div className={style.clock} variants={clockTransition}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH ? (
            sleepClock ? (
              <motion.div
                key="sleep_time"
                className={style.select_time}
                {...fade}
              >
                <DatePickerView
                  value={new Date(sleepTime)}
                  onChange={changeTime}
                  mode="time"
                  locale={enUs}
                />
                <div className={style.time}>
                  预计睡眠 : {hour}时{minute}分
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="closeClock"
                className={style.clock_close}
                {...fade}
              >
                <i className="iconfont icon-clock"></i>
                <p>闹钟已关闭</p>
                <p>仅睡眠分析</p>
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
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH ? (
            <>
              <motion.i
                key="play"
                {...btnFade}
                className="iconfont icon-sleep"
                onClick={startSleep}
              ></motion.i>
              <motion.p {...btnFade}>开始睡眠</motion.p>
            </>
          ) : (
            <motion.div key="pause" {...btnFade} className={style.pause}>
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
              <p>长按结束</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={fade} className={style.tool_bar}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {state === FINISH ? (
            <motion.div {...fade} className={style.container}>
              <div className={style.wrap} onClick={toggleSleepClock}>
                <i className="iconfont icon-clock"></i>
                <span>闹钟{sleepClock ? "开" : "关"}</span>
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
            onClick={() => handleSetSleepClockDelay(item * 60)}
          >
            {sleepClockDelay === item * 60 && (
              <i className={`iconfont icon-yes ${style.icon_choice}`}></i>
            )}
            {String(item).padStart(2, "0")} 分钟
          </div>
        ))}
      </Drawer>
      <SoundDrawer visible={soundOpen} close={closeSoundDrawer} />
    </motion.div>
  );
}
export default React.memo(Sleep);

function calcTime(time, entireMiute = false) {
  const now = new Date();
  const date = new Date(time);
  now.setMilliseconds(0);
  if (entireMiute) now.setSeconds(0);
  if (date <= now) {
    date.setDate(date.getDate() + 1);
  }
  return (date - now) / 1000;
}
