import React, { memo } from "react";
import style from "./style.module.scss";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
function Menu(props) {
  const { activeColor = "#000", ...restProps } = props;
  const activeStyle = { color: activeColor, opacity: 1 };
  return (
    <motion.div className={style.menu} {...restProps}>
      <NavLink to="/home" activeStyle={activeStyle}>
        <i className="iconfont icon-home"></i>
      </NavLink>
      <NavLink to="/explore" activeStyle={activeStyle}>
        <i className="iconfont icon-compass"></i>
      </NavLink>
      <NavLink to="/user" activeStyle={activeStyle}>
        <i className="iconfont icon-user"></i>
      </NavLink>
    </motion.div>
  );
}
export default memo(Menu);
