import React, { memo, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { modeToText, modeToIcon, modeToColor } from "../../constant";
function FinishDrawer(props) {
  const { visible, close, type, duration, typeName, ...restProps } = props;
  const { active, soundList } = useSelector(({ music }) => music);
  const sound = soundList[active] || {};
  const [shareOpen, setShareOpen] = useState(false);
  const handleShareOpen = () => {
    setShareOpen(true);
  };
  const handleShareClose = () => {
    setShareOpen(false);
  };
  const toDay = useMemo(() => {
    const now = new Date();
    return { month: now.getMonth() + 1, day: now.getDate() };
  }, []);
  const timeStep = useMemo(() => {
    const now = new Date();
    const prev = new Date();
    prev.setMinutes(prev.getMinutes() - duration);
    return {
      start: `${String(prev.getHours()).padStart(2, "0")}:${String(
        prev.getMinutes()
      ).padStart(2, "0")}`,
      end: `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`,
    };
  }, [duration]);
  const ele = (
    <AnimatePresence initial={false} exitBeforeEnter>
      {visible && (
        <motion.div
          initial={{
            y: 100,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          exit={{
            y: 100,
            opacity: 0,
          }}
          transition={{ ease: "easeInOut" }}
          className={style.finish_drawer}
          style={{ backgroundImage: `url(${sound.cover})` }}
          {...restProps}
        >
          <div className={style.header}>
            <i
              className={`iconfont icon-close ${style.icon}`}
              onClick={close}
            ></i>
          </div>

          <div className={style.greet}>
            <div>
              <i className={`iconfont icon-yanhua ${style.icon}`}></i>
              <span>非常好</span>
            </div>
            <p>在潮汐的第XX次{modeToText[type]}</p>
          </div>
          <motion.div
            className={style.card}
            onClick={handleShareClose}
            animate={{
              y: shareOpen ? "-15vh" : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(to bottom, ${modeToColor[type]}, #27ae60)`,
            }}
          >
            <i
              className={`iconfont icon-${modeToIcon[type]} ${style.card_icon}`}
            ></i>
            <div className={style.card_header}>
              <span className={style.card_date}>
                {toDay.month}月{toDay.day}日
              </span>
              <p className={style.card_time}>
                {timeStep.start}-{timeStep.end}
              </p>
            </div>
            <div className={style.card_content}>
              我刚刚进行了{duration}分钟的{modeToText[type]}练习.
            </div>
            <div className={style.card_footer}>
              <div className={style.card_footer_name}>
                <span>时长</span>
                <span>模式</span>
                <span>{modeToText[type]}效率</span>
              </div>
              <div className={style.card_footer_value}>
                <span>{duration}分钟</span>
                <span>{typeName}</span>
                <span>78%</span>
              </div>
            </div>
          </motion.div>
          <div className={style.share}>
            <div className={style.share_btn} onClick={handleShareOpen}>
              分享
            </div>
            <motion.div
              onClick={handleShareClose}
              initial={false}
              animate={{
                y: shareOpen ? 0 : "100%",
              }}
              transition={{ duration: 0.3 }}
              className={style.share_items}
            >
              分享功能
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(ele, document.body);
}
export default memo(FinishDrawer);
