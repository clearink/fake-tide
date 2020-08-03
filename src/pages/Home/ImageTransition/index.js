import React, { useEffect, useCallback } from "react";
import style from "./style.module.scss";
import { useDrag } from "react-use-gesture";
import { useSprings, animated, to } from "react-spring";
import { range } from "utils";
import { useSelector, useDispatch } from "react-redux";
import { changeMusic } from "../../../store/music";
import { imageFormat } from "../../../constant";
//切换背景特效
const ImageTransition = (props) => {
  //7张图片
  const dispatch = useDispatch();
  const { active, soundList } = useSelector(({ music }) => music);
  const MaxImage = 10;
  const [styles, update] = useSprings(MaxImage, (i) => ({
    x: (i - Math.min(MaxImage - 1, active)) * window.innerWidth,
    sc: 1,
    br: 0,
  }));
  const changeImage = useCallback(
    (nextIndex, mx = 0, down = false, distance = 0) => {
      update((i) => {
        const x = (i - nextIndex) * window.innerWidth + (down ? mx : 0);
        const sc = down ? 1 - distance / window.innerWidth / 3 : 1;
        const br = down ? (distance / window.innerWidth) * 8 : 0;
        return { x, sc: Math.max(sc, 0.94), br: Math.min(br, 1.4) };
      });
    },
    [update]
  );
  const bind = useDrag(({ down, movement: [mx], direction: [dx], cancel }) => {
    //dx>0向右
    const distance = Math.abs(mx);
    let nextSong = active;
    if (down && distance * 2 > window.innerWidth) {
      nextSong = range(active + (dx > 0 ? -1 : 1), 0, MaxImage - 1);
      dispatch(changeMusic(nextSong));
      cancel();
    }
    changeImage(nextSong, mx, down, distance);
  });
  useEffect(() => {
    if (active < MaxImage) changeImage(active);
  }, [active, changeImage]);
  return (
    <div {...bind()}>
      <div className={style.image_transition}>
        {styles.map(({ x, sc, br }, i) => (
          <animated.div
            className={style.image}
            key={i}
            style={{
              transform: to(
                [x, sc],
                (x, sc) => `translateX(${x}px) scale(${sc})`
              ),
              borderRadius: br.to((br) => `${br}rem`),
            }}
          >
            <img
              src={`${soundList[i]?.cover_url}${imageFormat(800, 800)}`}
              alt={soundList[i]?.["name"]?.["zh-Hans"]}
            />
            <div
              className={style.mask}
              style={{
                background: `linear-gradient(rgba(${soundList[i]?.scene_masks?.[0]}), rgba(${soundList[i]?.scene_masks?.[1]}))`,
              }}
            ></div>
          </animated.div>
        ))}
      </div>
      {props.children}
    </div>
  );
};
export default React.memo(ImageTransition);
