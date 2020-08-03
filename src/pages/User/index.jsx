import React, { memo } from "react";
import style from "./style.module.scss";
import { motion } from "framer-motion";

import { animateProps, pageTransition } from "../../constant/variants";

import Menu from "../../components/Menu";

function User(props) {
  return (
    <>
      <motion.div
        className={style.user}
        {...animateProps}
        variants={pageTransition}
      >
        <motion.div className={style.header}>用户</motion.div>
      </motion.div>
      <Menu
        style={{
          backgroundColor: "white",
          position: "fixed",
          bottom: "0",
          width: "100%",
        }}
      />
    </>
  );
}
export default memo(User);
