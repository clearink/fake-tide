import React, { useCallback, memo } from "react";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { playPauseMusic } from "../../../store/music";
import { Toast } from "antd-mobile";
import { homeRouteList, modeToText } from "../../../constant";
import { FINISH } from "../../../store/timer";
import Menu from "../../../components/Menu";
function Action(props) {
  const { canPlay } = useSelector(({ music }) => music);
  const { appMode } = useSelector(({ mode }) => mode);
  const { state } = useSelector(({ timer }) => timer);
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePaly = () => {
    dispatch(playPauseMusic());
  };
  const changeRoute = useCallback(
    (item) => {
      if (appMode === item.mode || state === FINISH) history.push(item.path);
      else Toast.fail(`正在${modeToText[appMode]}中`, 1, null, false);
    },
    [history, appMode, state]
  );
  return (
    <motion.div className={style.action}>
      <div className={style.greet}>
        <h2 className={style.hello}>上午好</h2>
        <p className={style.text}>当时明月在, 曾照彩云归</p>
      </div>
      <div className={style.play} onClick={handlePaly}>
        <i
          className={`iconfont icon-play ${
            canPlay ? style.play_music : undefined
          }`}
        ></i>
      </div>
      <div className={style.mode_list}>
        {homeRouteList.map((item) => (
          <div key={item.path} onClick={() => changeRoute(item)}>
            <i
              className={`iconfont icon-${item.icon} ${
                appMode === item.mode && state !== FINISH && style.active
              }`}
            ></i>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <Menu activeColor="#fff" />
    </motion.div>
  );
}
export default memo(Action);
