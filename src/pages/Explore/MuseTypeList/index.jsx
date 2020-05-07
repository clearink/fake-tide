import React, { memo } from "react";
import style from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setMuseVisible, setMuseActive } from "../../../sotre/muse";
import { imageFormat } from "../../../constant";
import { Modal } from "antd-mobile";
import { PLAY } from "../../../sotre/timer";

function MuseTypeList(props) {
  const { museList, state } = useSelector(({ muse }) => muse);
  const dispatch = useDispatch();
  const handleOpenMuse = (index) => {
    if (state === PLAY) {
      //询问是否改变音频
      Modal.alert("更换冥想练习?", "当前正在练习,确定更换?", [
        {
          text: "取消",
          style: "default",
        },
        {
          text: "确定",
          onPress: () => {
            dispatch(setMuseVisible(true));
            dispatch(setMuseActive(index));
          },
        },
      ]);
    } else {
      dispatch(setMuseVisible(true));
      dispatch(setMuseActive(index));
    }
  };
  const { ...restProps } = props;
  return (
    <div className={style.list} {...restProps}>
      {museList.map((item, i) => (
        <div
          key={item.id}
          className={style.item}
          onClick={() => handleOpenMuse(i)}
        >
          <img
            className={style.cover}
            src={`${item.image}${imageFormat(100, 100)}`}
            alt={item.name["zh-Hans"]}
          />
          <p>{item.name["zh-Hans"]}</p>
        </div>
      ))}
      {/* {museList.map(({ name, color }) => (
        <div key={name} className={style.item} onClick={handleOpenMuse}>
          <div className={style.bg} style={{ backgroundColor: color }}></div>
          <p>{name}</p>
        </div>
      ))} */}
    </div>
  );
}
export default memo(MuseTypeList);
