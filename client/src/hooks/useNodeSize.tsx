import { useState, useEffect } from "react";

export function useNodeSize(node: HTMLElement) {
  function getNodeSize() {
    const { clientWidth: width, clientHeight: height } = node;
    return { width, height };
  }

  const [size, setSize] = useState(getNodeSize);

  useEffect(() => {
    function setNodeSize() {
      return setSize(getNodeSize());
    }
    window.addEventListener("resize", setNodeSize);
    return () => {
      window.removeEventListener("resize", setNodeSize);
    };
  }, [node]);

  return size;
}
