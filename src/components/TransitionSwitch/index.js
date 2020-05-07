import React, { Children } from "react";
import { useLocation, Switch, matchPath, Redirect } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
function TransitionSwitch(props) {
  const { renderOne = true, children } = props;
  const location = useLocation();
  let path;
  Children.forEach(children, (child) => {
    if (matchPath(location.pathname, child.props.path)) {
      path = child.props.path;
    }
  });
  return (
    <AnimatePresence initial={false} exitBeforeEnter={renderOne}>
      <Switch key={path} location={location}>
        {children}
      </Switch>
    </AnimatePresence>
  );
}
export default TransitionSwitch;

export function TransitionRedirect(props) {
  const { to } = props;
  return (
    <motion.div exit>
      <Redirect to={to} />
    </motion.div>
  );
}
