import { useState, useEffect, useCallback } from "react";

type AsyncTaskResult<T> = {
  result: T | null;
  loading: boolean;
  error: any;
  run: () => Promise<void>;
};

export const useAsyncTask = <T = any>(
  task: () => Promise<T>,
  deps: any[] = []
): AsyncTaskResult<T> => {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await task();
      setResult(res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { result, loading, error, run };
};
