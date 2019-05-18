import { useState, useCallback, useRef } from "react";

type AsyncStateType<T> =
  | { loading: true; data: null; error: null }
  | { loading: false; data: T; error: null }
  | { loading: false; data: null; error: Error };

export function useAsync<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>
): [AsyncStateType<T>, (...args: Args) => void] {
  const idRef = useRef(0);
  const [state, setState] = useState<AsyncStateType<T>>({
    loading: true,
    data: null,
    error: null
  });

  const runAsync = useCallback(
    async function runAsync(...args: Args) {
      const reqId = ++idRef.current;
      setState({ loading: true, data: null, error: null });
      try {
        const data = await fn(...args);
        if (reqId === idRef.current) {
          setState({ loading: false, data, error: null });
        }
      } catch (error) {
        if (reqId === idRef.current) {
          setState({ loading: false, data: null, error });
        }
      }
    },
    [fn]
  );

  return [state, runAsync];
}
