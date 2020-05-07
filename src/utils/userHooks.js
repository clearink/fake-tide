import { useState, useEffect, useCallback } from "react";
import { throttle } from "./index";
//移动端音频第一次播放必须由用户手势触发
export function useMobileHackPlay() {
  useEffect(() => {
    const audios = document.querySelectorAll("audio");
    const hackPlay = () => {
      audios.forEach((audio) => {
        audio.muted = false;
        audio.pause();
      });
    };
    document.addEventListener("click", hackPlay, { once: true });
    document.addEventListener("touchend", hackPlay, { once: true });
  }, []);
}
export function usePress(...cancel) {
  const [down, setDown] = useState(false);
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    let timer;
    if (percent > 110) {
      cancel.forEach((func) => func());
      setDown(false);
      setPercent(0);
    } else if (!down) {
      setPercent(0);
    } else {
      timer = setTimeout(() => {
        setPercent((_) => _ + 10);
      }, 110);
    }
    return () => clearTimeout(timer);
  }, [down, percent, cancel]);

  return [down, setDown, percent];
}
export function useThrottle(fn, delay = 20) {
  return useCallback(throttle(fn, delay), []);
}
