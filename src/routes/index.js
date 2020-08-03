import React from "react";
import Home from "../pages/Home";
import Focus from "../pages/Home/Focus";
import Sleep from "../pages/Home/Sleep";
import Nap from "../pages/Home/Nap";
import Breathe from "../pages/Home/Breathe";
import { Route } from "react-router-dom";
import Explore from "../pages/Explore";
import User from "../pages/User";
import { TransitionRedirect } from "../components/TransitionSwitch";
import ExploreSleep from "../pages/Explore/Sleep";
import SoundDetail from "../pages/Explore/SoundDetail";

/**
 * /home 主页
 * /home/sounds 设置声音
 * /home/focus 专注
 * /home/sleep 睡眠
 * /home/nap 小憩
 * /home/breathe 呼吸
 * /explore 探索
 */

export const routes = [
  {
    path: "/",
    component: () => <TransitionRedirect to="/home" />,
    exact: true,
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "/home/focus",
        component: Focus,
        exact: true,
      },
      {
        path: "/home/sleep",
        component: Sleep,
        exact: true,
      },
      {
        path: "/home/nap",
        component: Nap,
        exact: true,
      },
      {
        path: "/home/breathe",
        component: Breathe,
        exact: true,
      },
    ],
  },
  {
    path: "/explore",
    component: Explore,
    children: [
      {
        path: "/explore/:type/:id",
        component: SoundDetail,
        exact: true,
      },
      {
        path: "/explore/sleep/:name",
        component: ExploreSleep,
        exact: true,
      },
    ],
  },

  {
    path: "/user",
    component: User,
  },
];

export const renderRoutes = (routes) => {
  return routes.map((item) => {
    const { path, exact, children } = item;
    return (
      <Route key={path} path={path} exact={exact}>
        <item.component routes={children} />
      </Route>
    );
  });
};
