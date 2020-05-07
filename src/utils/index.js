export function throttle(fn, delay = 200) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    try {
      args[0].persist();
    } catch {}
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}
export function debounce(fn, delay = 200) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function range(value, start, end) {
  if (value <= start) {
    return start;
  } else if (value >= end) {
    return end;
  } else {
    return value;
  }
}

export function formateTime(seconds) {
  const minute = ~~(seconds / 60) + "";
  const second = (seconds % 60) + "";
  return `${minute.padStart(2, "0")}:${second.padStart(2, "0")}`;
}

export function vibrate(time = 100) {
  if ("vibrate" in navigator) {
    navigator.vibrate(time);
  }
}
export function calcCurrentTime() {
  const now = new Date();
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return [hour, minute];
}
