import React, { FC } from "react";
import Image, { ImageProps } from "next/image";
import cx from "classnames";

import styles from "./ImageWrapper.module.scss";

export interface ImageWrapperProps extends ImageProps {
  className?: string;
}

/**
 * Returns a Next/Image component with standardized properties.
 * Allows images to be easily configured for a variety of layout demands.
 */
const ImageWrapper: FC<ImageWrapperProps> = ({
  className,
  src,
  alt,
  width,
  height,
  style,
  ...props
}) => {
  return (
    <Image
      {...props}
      className={cx(styles.base, className)}
      src={src}
      alt={alt || ""}
      width={width}
      height={height}
      style={{
        ...style,
        aspectRatio: `${width} / ${height}`,
      }}
    />
  );
};

export default ImageWrapper;
