import React, { memo } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { NAP, SLEEP } from "../../sotre/mode";
import { startTimer } from "../../sotre/timer";
function ClockDrawer(props) {
  const { visible, close } = props;
  const { appMode } = useSelector(({ mode }) => mode);
  const { napClockDelay } = useSelector(({ nap }) => nap);
  const { sleepClockDelay } = useSelector(({ sleep }) => sleep);
  const dispatch = useDispatch();
  const delayTime = () => {
    close();
    if (appMode === SLEEP) {
      dispatch(startTimer({ target: sleepClockDelay, mode: SLEEP }));
    } else if (appMode === NAP) {
      dispatch(startTimer({ target: napClockDelay, mode: NAP }));
    }
  };
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
          className={style.clock_drawer}
        >
          <div className={style.wrap}>
            <div className={style.circle}></div>
            <div className={style.time}>
              <p>16</p>
              <p>22</p>
            </div>
          </div>
          <div className={style.action}>
            <div className={style.btn} onClick={delayTime}>
              再睡一会儿
            </div>
            <div className={style.btn_default} onClick={close}>
              起床
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(ele, document.body);
}
export default memo(ClockDrawer);
