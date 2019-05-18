import { useState, useEffect } from "react";

export function useNodeSize(node?: HTMLElement | null) {
  const [size, setSize] = useState(getNodeSize(node));

  useEffect(() => {
    setSize(getNodeSize(node));
  }, [node]);

  useEffect(() => {
    function setNodeSize() {
      return setSize(getNodeSize(node));
    }
    window.addEventListener("resize", setNodeSize);
    return () => {
      window.removeEventListener("resize", setNodeSize);
    };
  }, [node]);

  return size;
}

function getNodeSize(node?: HTMLElement | null) {
  if (node) {
    const { offsetWidth: width, offsetHeight: height } = node;
    return { width, height };
  }
  return { width: 0, height: 0 };
}
