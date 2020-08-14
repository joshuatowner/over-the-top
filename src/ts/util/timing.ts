 export function setIntervalImmediate(func: () => unknown, interval: number) {
    func();
    setInterval(func, interval);
 }
