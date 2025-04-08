import React, { FC, ReactNode, useState } from "react";
import styles from "./Shell.module.scss";
import { AnimatePresence } from "framer-motion";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import VideoOverlay from "./video/VideoOverlay/VideoOverlay";
import { SectionProvider } from "util/hooks/useSectionHieghts";

type ShellProps = {
  children: ReactNode;
};

// TODO: Type videoOembed API response type
interface VideoOverlayHandler {
  (videoOembed: any): void;
}
export const VideoOverlayContext = React.createContext<VideoOverlayHandler | null>(
  null
);

const Shell: FC<ShellProps> = ({ children }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayVideo, setOverlayVideo] = useState<any>(null);

  const onOpenVideoOverlay = (videoOembed: any) => {
    setOverlayVideo(videoOembed);
    setShowOverlay(true);
  };

  const onCloseOverlay = () => {
    setShowOverlay(false);
  };
  return (
    <SectionProvider>
      <VideoOverlayContext.Provider value={onOpenVideoOverlay}>
        <div className={styles.base}>
          <Header />
          <div className={styles.content}>{children}</div>
          <Footer />
          <AnimatePresence>
            {showOverlay && overlayVideo && (
              <VideoOverlay
                videoOembed={overlayVideo}
                onClick={onCloseOverlay}
              />
            )}
          </AnimatePresence>
        </div>
      </VideoOverlayContext.Provider>
    </SectionProvider>
  );
};

export default Shell;
