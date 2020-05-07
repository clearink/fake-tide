import { FOCUS, SLEEP, BREATHE, NAP } from "../sotre/mode";
import { TIMER_MODE, EFFICIENT_MODE, INFINITE_MODE } from "../sotre/focus";

export const showFinishPageMinTime = 300;
export const modeToText = {
  FOCUS: "专注",
  SLEEP: "睡眠",
  NAP: "小憩",
  BREATHE: "呼吸",
};
export const modeToIcon = {
  FOCUS: "focus",
  SLEEP: "sleep",
  NAP: "nap",
  BREATHE: "breathe",
};
export const modeToColor = {
  FOCUS: "#3498db",
  SLEEP: "#f1c40f",
  NAP: "#c0392b",
  BREATHE: "#27ae60",
};
export const homeRouteList = [
  {
    path: "/home/focus",
    icon: modeToIcon.FOCUS,
    title: "专注",
    mode: FOCUS,
  },
  {
    path: "/home/sleep",
    icon: modeToIcon.SLEEP,
    title: "睡眠",
    mode: SLEEP,
  },
  {
    path: "/home/nap",
    icon: modeToIcon.NAP,
    title: "小憩",
    mode: NAP,
  },
  {
    path: "/home/breathe",
    icon: modeToIcon.BREATHE,
    title: "呼吸",
    mode: BREATHE,
  },
];
export const focusModeList = [
  {
    icon: "clock",
    title: "计时模式",
    mode: TIMER_MODE,
    color: "#e74c3c",
    intro: "设定目标, 保持专注",
  },
  {
    icon: "tomato",
    title: "高效模式",
    mode: EFFICIENT_MODE,
    color: "#27ae60",
    intro: "基于番茄工作法,劳逸结合、提升效率",
  },
  {
    icon: "infinite",
    title: "无限模式",
    mode: INFINITE_MODE,
    color: "#2980b9",
    intro: "正向计时,随用随记",
  },
];
export const FocusModeToText = {
  TIMER_MODE: "计时模式",
  EFFICIENT_MODE: "高效模式",
  INFINITE_MODE: "无限模式",
};
export const FocusModeToIcon = {
  TIMER_MODE: "clock",
  EFFICIENT_MODE: "tomato",
  INFINITE_MODE: "infinite",
};

//番茄模式
export const tomatoSettings = {
  FocusTime: 25 * 60,
  ShortRelax: 5 * 60,
  LongRelax: 15 * 60,
  // FocusTime: 3,
  // ShortRelax: 3,
  // LongRelax: 6,
};

export const EXPLORE_PATH = "/explore";

export const imageFormat = (w, h) =>
  `?imageMogr2/thumbnail/!${w}x${h}r|imageView2/2/format/webp`;
