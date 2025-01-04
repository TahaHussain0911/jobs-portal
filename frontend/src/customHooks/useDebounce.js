import { useEffect, useState } from "react";

const useDebounce = (search, delay = 300) => {
  const [debounceValue, setDebouncevalue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncevalue(search);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return debounceValue;
};
export default useDebounce;
