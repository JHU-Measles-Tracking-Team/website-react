import React from "react";
import styles from "./ResponsiveImage.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
const cx = classNames.bind(styles);

type TResponsiveImageProps = {
  imageUrl?: string;
  maxWidth?: string;
  maxHeight?: string;
  height?: number;
  width?: number;
  backgroundSize?: string;
  className?: string;
};

const ResponsiveImage = ({
  imageUrl,
  maxHeight,
  maxWidth,
  height = 100,
  width = 100,
  backgroundSize = "cover",
  className,
}: TResponsiveImageProps) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => setLoaded(true);
  const underStyles = maxHeight || maxHeight ? { maxWidth, maxHeight } : {};
  return (
    <div className={cx(styles.base, loaded && styles.loaded, className)}>
      <div
        className={cx(styles.image, loaded && styles.loaded)}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "inline-block",
          position: "relative",
          backgroundSize,
          width: "100%",
          ...underStyles,
        }}
      >
        <Image
          className={styles.under}
          style={underStyles}
          onLoad={handleLoad}
          src={imageUrl}
          alt={"title"}
          loading="lazy"
          height={height}
          width={width}
        />
      </div>
    </div>
  );
};

export default ResponsiveImage;
