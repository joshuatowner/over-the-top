import AppliedObservable from "./appliedObservable";

export type Observer<T> = (value: T) => unknown;

export interface Observable<T> {
  watch(observer: Observer<T>): void;
  remove(observer: Observer<T>): void;
}

export abstract class BaseObservable<T> implements Observable<T> {
  protected observers: Observer<T>[];

  protected constructor() {
    this.observers = [];
  }

  watch = (observer: Observer<T>) => {
    this.observers.push(observer);
  }

  remove = (observer: Observer<T>) => {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

}
