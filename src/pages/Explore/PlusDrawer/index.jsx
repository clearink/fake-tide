import React, { memo } from "react";
import style from "./style.module.scss";
import { AnimatePresence, motion } from "framer-motion";

function PlusDrawer(props) {
  const { close } = props;
  return (
    <div className={style.drawer}>
      PlusDrawer
      <span onClick={close}>close</span>
    </div>
  );
}
export default memo(PlusDrawer);
