import { useState, useEffect } from "react";

const useWindowSize = () => {
  const _default = {
    width: 1024,
    height: 768,
  };

  if (typeof window !== "undefined") {
    _default.width = window.innerWidth;
    _default.height = window.innerHeight;
  }

  const [size, setSize] = useState(_default);

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
