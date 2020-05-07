import React, { memo } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import "./style.scss";
function Drawer(props) {
  const { children, title, contentStyle = {}, visible, close } = props;

  const ele = (
    <div className={`drawer ${visible && "drawer-open"}`}>
      <div className="drawer_mask" onClick={close}></div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{
          y: visible ? 0 : "100%",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="drawer_content"
        style={contentStyle}
      >
        <div className="drawer_title">{title}</div>
        <div className="drawer_body">{children}</div>
      </motion.div>
    </div>
  );
  return ReactDOM.createPortal(ele, document.body);
}
export default memo(Drawer);
