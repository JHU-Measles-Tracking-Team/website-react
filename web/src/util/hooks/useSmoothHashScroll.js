import { useRouter } from "next/router";
import { useEffect } from "react";
import { homepageAnchors } from "data/navigation";

export const updateHash = (hash) => {
  if (hash === "" || hash === "#" || hash === null || hash === undefined) {
    return;
  }
  if (hash.startsWith("#") === false) hash = "#" + hash;

  if (window.history.pushState) {
    window.history.pushState(null, null, hash);
  } else {
    window.location.hash = hash;
  }
};

const useSmoothHashScroll = (anchorName) => {
  const router = useRouter();
  const locationHash = "#" + router.asPath.split("#")?.[1];

  useEffect(() => {
    if (typeof window === "undefined") {
      // Do nothing on the server-side
      return;
    }

    if (locationHash === "#" + anchorName) {
      window.requestAnimationFrame(() => {
        const el = document.getElementById(locationHash.slice(1));
        if (el === null) {
          return;
        }

        const offsetTop = el
          ? el.getBoundingClientRect().top + window.pageYOffset
          : 0;

        const position =
          anchorName === homepageAnchors["home"] || !anchorName
            ? 0
            : offsetTop - 80;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      });
    }
  }, [locationHash, anchorName]);
};

export default useSmoothHashScroll;
