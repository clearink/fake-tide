import React, { memo } from "react";
import style from "./style.module.scss";

function PlusDrawer(props) {
  const { close } = props;
  return (
    <div className={style.drawer}>
      PlusDrawer
      <span onClick={close}>close</span>
    </div>
  );
}
export default memo(PlusDrawer);
