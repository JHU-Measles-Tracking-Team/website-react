import { useCallback, useState } from "react";
import { getElemXY } from "../helper";

/*
  Like useClientRect + useY but uses less expensive measurement
  tool and only fires on resize, not constantly on scroll.
*/
export const useElementDimensions = () => {
  // console.log("useElementDimensions main hook");
  const [x, setX] = useState<number | null>(null);
  const [y, setY] = useState<number | null>(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const ref = useCallback((node: any) => {
    const update = () => {
      // console.log("useElementDimensions update callback");
      if (node !== null) {
        setX(getElemXY(node).x);
        setY(getElemXY(node).y);
        setWidth(node.offsetWidth);
        setHeight(node.offsetHeight);
      }
    };
    update();
    window.setTimeout(update, 1000); // "kicker"
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);
  return [x, y, width, height, ref];
};
