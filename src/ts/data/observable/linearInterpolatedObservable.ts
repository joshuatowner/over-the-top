import IntervalObservable from "./intervalObservable";
import {Observable} from "./observable";

export default class LinearInterpolatedObservable
  extends IntervalObservable<number> implements Observable<number> {

  private oldValue: number | undefined;
  private oldTime: number | undefined;
  private newValue: number | undefined;
  private newTime: number | undefined;
  private baseObservable: Observable<number>;

  constructor(source: Observable<number>, interval: number) {
    super(() => this.getUpdate(), interval);
    this.baseObservable = source;
    this.baseObservable.watch(this.receiveUpdate);
  }

  getUpdate = (): number => {
    if (this.oldTime !== undefined
      && this.oldValue !== undefined
      && this.newTime !== undefined
      && this.newValue !== undefined) {
      let currentTime = new Date().getTime() - (this.newTime - this.oldTime);
      if (currentTime > this.newTime) {
        currentTime = this.newTime;
      }
      const percent = (currentTime - this.oldTime) / (this.newTime - this.oldTime);
      return this.oldValue + (this.newValue - this.oldValue) * percent;
    } else if (this.oldValue !== undefined) {
      return this.oldValue;
    } else {
      return 0;
    }
  }

  receiveUpdate = (next: number) => {
    this.oldValue = this.newValue;
    this.oldTime = this.newTime;
    this.newValue = next;
    this.newTime = new Date().getTime();
  }
}
