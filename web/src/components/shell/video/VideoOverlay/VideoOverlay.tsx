import React, { FC, MouseEvent } from "react";
import cx from "classnames";

import styles from "./VideoOverlay.module.scss";
import MenuClose from "images/icons/Exit";
import { motion } from "framer-motion";
import { fadeIn, fadeUp } from "util/animation/presets";
import Container from "components/layout/Container/Container";

type VideoOverlayProps = {
  className?: string;
  videoOembed: any;
  onClick?: (event: MouseEvent) => void;
};

const VideoOverlay: FC<VideoOverlayProps> = ({
  className,
  videoOembed,
  onClick,
}) => {
  return (
    <motion.div
      className={cx(styles.base, className)}
      initial="hide"
      animate="reveal"
      exit="hide"
      variants={fadeIn}
    >
      <Container className={styles.container} preset="narrow">
        <MenuClose className={styles.close} onClick={onClick} />
        <motion.div
          className={styles.video}
          variants={fadeUp}
          initial="hide"
          animate="reveal"
          exit="hide"
          transition={{ delay: 1 }}
        >
          <div
            className={cx(styles.videoEmbed)}
            dangerouslySetInnerHTML={{ __html: videoOembed.html }}
          />
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default VideoOverlay;
