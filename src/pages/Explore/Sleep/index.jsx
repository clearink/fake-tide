import React, { memo } from "react";
import style from "./style.module.scss";
import { motion } from "framer-motion";
function Sleep() {
  return (
    <motion.div
      initial={{
        x: "100%",
      }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{
        ease: "easeInOut",
      }}
      className={style.sleep}
    >
      sleep
    </motion.div>
  );
}
export default memo(Sleep);
