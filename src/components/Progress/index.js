import React from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
function Progress(props) {
  const { percent, ...another } = props;
  return (
    <div {...another} className={styles.progress}>
      <motion.div
        initial={false}
        animate={{ x: `${percent}%` }}
        className={styles.content}
        transition={{
          type: "tween",
        }}
      ></motion.div>
    </div>
  );
}
export default React.memo(Progress);
