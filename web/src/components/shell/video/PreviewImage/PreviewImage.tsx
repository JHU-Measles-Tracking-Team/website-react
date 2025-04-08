import React, { FC, useState, useEffect, useContext } from "react";
import cx from "classnames";
import styles from "./PreviewImage.module.scss";
import PlayButton from "components/ui/Icon/icons/PlayButton";
import { VideoOverlayContext } from "components/shell/Shell";

export type TPreviewImage = {
  className?: string;
  videoUrl: string;
};

/**
 * PreviewImage is a limited SMART component, because it expects to perform a client-side fetch to an oembed endpoint using a videoUrl extracted from markup.
 * The oembed endpoint will return a preview thumbnail image to be rendered, and an embed url that can be passed to the onClick callback
 *
 */
const PreviewImage: FC<TPreviewImage> = ({ className, videoUrl }) => {
  const [loading, setLoading] = useState(true);
  const [oembedData, setOembedData] = useState<any>(null);
  const onOpenVideoOverlay = useContext(VideoOverlayContext);

  function formatVideoUrl(url: string) {
    if (url.includes("youtube.com")) {
      return url + "&enablejsapi=1";
    }
    return url;
  }

  useEffect(() => {
    const fetchOembeds = async () => {
      // Use videoUrl to hit oembed endpoint and set oembedData
      const data = await fetch(
        "/api/oembed?url=" + formatVideoUrl(videoUrl),
      ).then((res) => {
        return res.json();
      });
      // Special case to check, locally it's json but on vercel it's string
      if (typeof data === "string") {
        try {
          const object = JSON.parse(data);
          setOembedData(object);
        } catch (err) {
          console.log("err", err);
          return null;
        }
      } else {
        setOembedData(data);
      }
      setLoading(false);
    };
    fetchOembeds();
  }, [videoUrl]);

  return loading || !oembedData ? (
    // <Loader />
    <p>Loading...</p>
  ) : (
    <div className={cx(styles.base, className)}>
      <img src={oembedData.thumbnail_url} alt={oembedData.title} />
      <button
        className={styles.videoButton}
        onClick={() => onOpenVideoOverlay?.(oembedData)}
      >
        <PlayButton />
      </button>
    </div>
  );
};

export default PreviewImage;
