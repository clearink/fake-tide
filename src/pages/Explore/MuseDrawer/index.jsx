import React, { memo, useRef } from "react";

import style from "./style.module.scss";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { imageFormat } from "../../../constant";
import { useThrottle } from "../../../utils/userHooks";
import {} from "react";
import MuseTypeList from "../MuseTypeList";
function MuseDrawer(props) {
  const { close } = props;
  const { soundList } = useSelector(({ music }) => music);
  const opacity = useMotionValue(0);
  const scrollRef = useRef();
  const handleScroll = useThrottle((e) => {
    if (e.target === scrollRef.current) {
      const scrollY = e.target.scrollTop;
      opacity.set(Math.min(1, ~~scrollY / 100));
    }
  });
  return (
    <div onScroll={handleScroll} ref={scrollRef} className={style.drawer}>
      <header className={style.header}>
        <i className="iconfont icon-back" onClick={close}></i>
        <motion.h2 style={{ opacity }}>冥想</motion.h2>
      </header>
      <div className={style.page_info}>
        <h2>冥想</h2>
        <span>有意识地,不带评判地持续关注每个当下</span>
      </div>
      <div className={style.group}>
        <div className={style.group_title}>
          <div className={style.wrap}>
            <p className={style.title}>轻冥想</p>
          </div>
          <p className={style.sub_title}></p>
        </div>
        <MuseTypeList style={{ padding: "0 2rem 1rem" }} />
      </div>
      <div className={style.group}>
        <div className={style.group_title}>
          <div className={style.wrap}>
            <p className={style.title}>时刻</p>
            <p className={style.more}>更多</p>
          </div>
          <p className={style.sub_title}>随时随地,开始冥想</p>
        </div>
        <div className={style.albums}>
          {soundList.map((sound) => (
            <Link
              key={sound.id}
              to={`/explore/muse/${sound.id}`}
              className={style.album}
            >
              <img
                src={`${sound.cover_url}${imageFormat(400, 400)}`}
                alt={sound.name["zh-Hans"]}
                className={style.cover}
              />
              <h3 className={style.name}>{sound.name["zh-Hans"]}</h3>
              <span className={style.duration}>duration</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={`${style.group} ${style.base}`}>
        <div className={style.group_title}>
          <div className={style.wrap}>
            <p className={style.title}>基础</p>
            <p className={style.more}>更多</p>
          </div>
          <p className={style.sub_title}>冥想的基本之道</p>
        </div>
        <div className={style.albums}>
          {soundList.map((sound) => (
            <Link
              key={sound.id}
              to={`/explore/muse/${sound.id}`}
              className={style.album}
            >
              <img
                src={`${sound.cover_url}${imageFormat(400, 400)}`}
                alt={sound.name["zh-Hans"]}
                className={style.cover}
              />
              <h3 className={style.name}>{sound.name["zh-Hans"]}</h3>
              <span className={style.duration}>duration</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default memo(MuseDrawer);
