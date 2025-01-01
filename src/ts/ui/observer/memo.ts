import {Backend} from "../../data/backend";
import {Observable} from "../../data/observable/observable";

export const memoObservable =
  <U extends Observable<any>>(f: (backend: Backend) => U): (backend: Backend) => U => {
    let savedBackend: Backend | undefined = undefined;
    let savedResult: U | undefined;
    return (backend: Backend) => {
      if (!savedBackend || !savedResult) {
        savedBackend = backend;
        savedResult = f(backend);
        return savedResult;
      } else if (backend === savedBackend) {
        return savedResult;
      } else {
        throw new Error("Observable called with multiple backends");
      }
    }
  }
