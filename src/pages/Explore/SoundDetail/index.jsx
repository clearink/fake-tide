import React, { memo } from "react";
import style from "./style.module.scss";
import { motion } from "framer-motion";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { imageFormat } from "../../../constant";
function SoundDetail(props) {
  const { goBack } = useHistory();
  const { id } = useParams();
  const { soundList } = useSelector(({ music }) => music);
  const sound = soundList.find((item) => item.id === id);
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className={style.sound_detail}
      style={{
        backgroundColor: `rgba(${sound?.primary_color})`,
      }}
    >
      {sound ? (
        <>
          <header className={style.header}>
            <i className="iconfont icon-back" onClick={goBack}></i>
          </header>
          <div className={style.cover}>
            <div className={style.description}>
              <h2>{sound.name?.["zh-Hans"]}</h2>
              <span>{sound.sub_title?.["zh-Hans"]}</span>
            </div>
            <img
              src={`${sound?.cover_url}${imageFormat(400, 400)}`}
              alt={sound.name?.["zh-Hans"]}
            />
          </div>
          <div className={style.content}>
            <blockquote>
              <p>{sound.description?.["zh-Hans"]}</p>
              <footer>
                <span>——</span>
                {sound.description_author?.["zh-Hans"]}
              </footer>
            </blockquote>
          </div>
          <div
            className={style.btn}
            style={{ color: `rgba(${sound?.primary_color})` }}
          >
            <i className="iconfont icon-play"></i>
            <span>播放</span>
          </div>
          <div
            className={style.mask}
            style={{
              background: `linear-gradient(rgba(${sound?.scene_masks?.[0]}), rgba(${sound?.scene_masks?.[1]}))`,
            }}
          ></div>
        </>
      ) : (
        <h1 style={{ color: "#000" }}>加载中...</h1>
      )}
    </motion.div>
  );
}
export default memo(SoundDetail);
