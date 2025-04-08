import React, { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import cx from "classnames";
import styles from "./CKContent.module.scss";
import PreviewImage from "components/shell/video/PreviewImage/PreviewImage";
import {
  extractImageDimensions,
  isAbsoluteUrl,
  resizeImage,
} from "util/helper";
import ImageWrapper from "components/tools/ImageWrapper/ImageWrapper";

type TCKContent = {
  className?: string;
  content?: string;
};

const CKContent: FC<TCKContent> = ({ content, className }) => {
  const parsedContent = parseContent(content || "");

  return (
    <div
      className={cx(styles.base, className)}
      dangerouslySetInnerHTML={{ __html: parsedContent }}
    />
  );
};

export const parseContent = (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  Array.from(doc.getElementsByTagName("img")).forEach((img) => {
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    const title = img.getAttribute("title");

    const dimensions = extractImageDimensions(src);

    if (!dimensions) {
      img.setAttribute("style", "max-width: 100%; height: auto;");
      return;
    }

    // Resize image based on aspect-ratio to fetch appropriate-sized image from Next server,
    // with max height of 600px and max width of 906px
    const { width, height } = resizeImage(
      dimensions.width,
      dimensions.height,
      906,
      600,
    );

    const nextImage = (
      <ImageWrapper
        src={src}
        alt={alt}
        width={width}
        height={height}
        title={title}
      />
    );
    const renderedNextImage = renderToStaticMarkup(nextImage);

    const placeholderElement = document.createElement("div");
    placeholderElement.innerHTML = renderedNextImage;

    img.parentElement.replaceChild(placeholderElement.firstChild, img);
  });

  Array.from(doc.getElementsByTagName("a")).forEach((a) => {
    const href = a.getAttribute("href");
    if (isAbsoluteUrl(href)) {
      a.setAttribute("target", "_blank");
      a.setAttribute("noreferrer", "");
    }
  });

  Array.from(doc.getElementsByTagName("figure")).forEach((figure) => {
    const oembeds = figure.getElementsByTagName("oembed");

    if (!oembeds.length) return;
    const oembed = oembeds.item(0);

    const previewImage = <PreviewImage videoUrl={oembed.getAttribute("url")} />;
    const staticPreviewImage = renderToStaticMarkup(previewImage);

    const tempElement = document.createElement("div");
    tempElement.innerHTML = staticPreviewImage;

    figure.appendChild(tempElement.firstChild);
  });

  return doc.body.innerHTML;
};

export default CKContent;
