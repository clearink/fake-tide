import React, { memo } from "react";
import style from "./style.module.scss";
import { motion } from "framer-motion";

function SleepDrawer(props) {
  const { close } = props;
  return (
    <div className={style.drawer}>
      SleepDrawer
      <span onClick={close}>close</span>
    </div>
  );
}
export default memo(SleepDrawer);
