import { useState, useEffect } from "react";

export function useWindowSize() {
  function getWindowSize() {
    const { innerHeight: height, innerWidth: width } = window;
    return { width, height };
  }

  const [size, setSize] = useState(getWindowSize);

  useEffect(() => {
    function setWindowSize() {
      return setSize(getWindowSize());
    }
    window.addEventListener("resize", setWindowSize);
    return () => {
      window.removeEventListener("resize", setWindowSize);
    };
  }, []);

  return size;
}
