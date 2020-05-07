import React, { memo, useState, useRef } from "react";

import style from "./style.module.scss";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { imageFormat } from "../../../constant";
import { useThrottle } from "../../../utils/userHooks";
import {} from "react";
const typeList = [
  "全部",
  "睡眠",
  "专注",
  "放松",
  "冥想",
  "自然",
  "都市",
  "旋律",
];
function SoundDrawer(props) {
  const { close } = props;
  const { soundList } = useSelector(({ music }) => music);
  const opacity = useMotionValue(0);
  const scrollRef = useRef();
  const [soundType, setSoundType] = useState("全部");
  const handleScroll = useThrottle((e) => {
    if (e.target === scrollRef.current) {
      const scrollY = e.target.scrollTop;
      opacity.set(Math.min(1, ~~scrollY / 100));
    }
  });
  return (
    <div onScroll={handleScroll} ref={scrollRef} className={style.drawer}>
      <header>
        <i className="iconfont icon-back" onClick={close}></i>
        <motion.h2 style={{ opacity }}>声音场景</motion.h2>
      </header>
      <div className={style.page_info}>
        <h2>声音场景</h2>
        <span>置身于自然万物的声音时空</span>
      </div>
      <ul className={style.navbar}>
        {typeList.map((item) => (
          <li
            key={item}
            onClick={() => setSoundType(item)}
            className={soundType === item ? style.active : undefined}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className={style.sound_list}>
        {soundList.map((item) => (
          <Link
            to={`/explore/sound/${item.id}`}
            className={style.sound_item}
            key={item.id}
          >
            <div className={style.wrap}>
              <img
                src={`${item.cover_url}${imageFormat(150, 150)}`}
                alt={item.name["zh-Hans"]}
              />
            </div>
            <p className={style.title}>{item.name["zh-Hans"]}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default memo(SoundDrawer);
