import { useEffect, useRef } from "react";

export function useStateChangeNotifier<T>(
  value: T,
  onChange: (oldValue: T, newValue: T) => void
) {
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      onChange(prev.current, value);
      prev.current = value;
    }
  }, [value, onChange]);
}