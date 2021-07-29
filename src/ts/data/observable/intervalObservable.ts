import {setIntervalImmediate} from "../../util/timing";
import {BaseObservable, Observable} from "./observable";
export type Source<T> = () => T | Promise<T>;

export default class IntervalObservable<T> extends BaseObservable<T> implements Observable<T> {
  private readonly source: Source<T>;
  public readonly interval: number;

  constructor(source: Source<T>, interval: number) {
    super();
    this.source = source;
    this.observers = [];
    this.interval = interval;
    setIntervalImmediate(this.update, interval);
  }

  update = async () => {
    if (this.observers.length > 0) {
      const value = await this.source();
      this.observers.map(observer => observer(value));
    }
  }
}
