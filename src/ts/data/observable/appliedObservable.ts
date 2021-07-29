import {BaseObservable, Observable} from "./observable";

export default class AppliedObservable<T, U> extends BaseObservable<U> implements Observable<U> {
  private readonly base: Observable<T>;
  private readonly f: (original: T) => U;

  constructor(base: Observable<T>, f: (original: T) => U) {
    super();
    this.base = base;
    this.f = f;
    base.watch(this.onUpdate);
  }

  onUpdate = (update: T) => {
    if (this.observers.length > 0) {
      this.observers.map(observer => observer(this.f(update)));
    }
  }
}

