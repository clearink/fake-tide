import React from "react";
import { motion } from "framer-motion";

import TransitionSwitch from "components/TransitionSwitch";
import ImageTransition from "./ImageTransition";
import Action from "./Action";

import { renderRoutes } from "../../routes";
import { pageTransition, animateProps } from "../../constant/variants";

//切换背景特效
const Home = (props) => {
  const { routes } = props;
  return (
    <motion.div {...animateProps} variants={pageTransition}>
      <ImageTransition>
        <Action />
      </ImageTransition>
      <TransitionSwitch renderOne={false}>
        {renderRoutes(routes)}
      </TransitionSwitch>
    </motion.div>
  );
};
export default React.memo(Home);
