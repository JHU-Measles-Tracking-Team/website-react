import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const [dims, setDims] = useState<null[] | number[]>([null, null]);

  useEffect(() => {
    const handleResize = () => {
      setDims([window.innerWidth, window.innerHeight]);
    };

    if (dims[0] !== window.innerWidth || dims[1] !== window.innerHeight) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dims]);

  return [dims[0], dims[1]] as const;
};

export default useWindowDimensions;
