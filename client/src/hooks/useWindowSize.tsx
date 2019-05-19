import { useState, useEffect } from "react";

export function getWindowSize() {
  const { innerHeight: height, innerWidth: width } = window;
  return { width, height: height - 65 };
}


export function useWindowSize() {

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
