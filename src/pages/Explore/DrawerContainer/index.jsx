import React, { memo } from "react";
import ReactDOM from "react-dom";
import style from "./style.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import SoundDrawer from "../SoundDrawer";
import MuseDrawer from "../MuseDrawer";
import SleepDrawer from "../SleepDrawer";
import PlusDrawer from "../PlusDrawer";
import { useLocation } from "react-router-dom";
import { EXPLORE_PATH } from "../../../constant";
const DrawerMap = {
  sound: SoundDrawer,
  muse: MuseDrawer,
  sleep: SleepDrawer,
  plus: PlusDrawer,
};
function DrawerContainer(props) {
  const { type, close } = props;
  const Drawer = DrawerMap[type];
  const { pathname } = useLocation();
  const ele = (
    <AnimatePresence initial={false} exitBeforeEnter>
      {type && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: pathname === EXPLORE_PATH ? 0 : "-25%" }}
          exit={{ x: "100%" }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
          className={style.drawer_container}
        >
          <Drawer close={close} />
        </motion.div>
      )}
    </AnimatePresence>
  );
  return ReactDOM.createPortal(ele, document.body);
}
export default memo(DrawerContainer);
