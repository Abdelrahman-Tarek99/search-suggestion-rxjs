import { useEffect } from "react";
import { Observable } from "rxjs";

export const useObservable = <T>(
  observable: Observable<T>,
  setter: (value: T) => void
) => {
  useEffect(() => {
    const subscription = observable.subscribe((value: T) => {
      setter(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observable, setter]);
};
