import {BaseObservable, Observable} from "./observable";

export default class TriggeredObservable<T> extends BaseObservable<T> implements Observable<T> {

  last?: T;
  checkLast: boolean;

  constructor(checkLast: boolean = false) {
    super();
    this.checkLast = checkLast;
  }

  pushUpdate = (update: T): void => {
    const differentFromLast = !this.checkLast || update !== this.last;
    const hasObservers = this.observers.length > 0;
    if (differentFromLast && hasObservers) {
      if (this.checkLast) {
        this.last = update;
      }
      this.observers.map(observer => observer(update));
    }
  }

}
