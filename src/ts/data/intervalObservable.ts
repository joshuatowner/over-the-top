
type Observer<T> = (value: T) => unknown;
type Source<T> = () => T | Promise<T>;

export default class IntervalObservable<T> {
  private readonly source: Source<T>;
  private observers: Observer<T>[];

  constructor(source:  Source<T>, interval: number) {
    this.source = source;
    this.observers = [];
    setInterval(this.update, interval);
  }

  watch(observer: Observer<T>) {
    this.observers.push(observer);
  }

  remove(observer: Observer<T>) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  update = async () => {
    if (this.observers.length > 0) {
      const value = await this.source();
      this.observers.map(observer => observer(value));
    }
  }
}