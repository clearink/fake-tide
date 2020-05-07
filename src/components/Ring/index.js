import React from "react";
import style from "./style.module.scss";
import { useMemo } from "react";
function Ring(props) {
  const { rate, radius, color, strokeWidth = 4, ...another } = props;
  const perimeter = useMemo(() => (Math.PI * 2 * (radius - strokeWidth)) | 0, [
    radius,
    strokeWidth,
  ]);
  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      {...another}
    >
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        strokeWidth={strokeWidth}
        stroke="rgba(255, 255, 255, 0.3)"
        fill="none"
      ></circle>
      {/* <!-- 需要显示的圆环  通过修改 stroke-dasharray="0 1069"的0值那块，(角度/360) = 圆弧长度/周长  这里的圆弧长度就是第一个值--> */}
      <circle
        className={style.fill}
        cx={radius}
        cy={radius}
        r={radius - strokeWidth}
        strokeWidth="4"
        stroke={color}
        fill="none"
        strokeDasharray={`${perimeter * rate} ${perimeter}`}
      ></circle>
    </svg>
  );
}
export default React.memo(Ring);
