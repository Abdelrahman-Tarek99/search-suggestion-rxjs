import { useEffect } from "react";

export const useObservable = <T>(
  observable: any,
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
