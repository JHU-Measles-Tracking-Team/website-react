import { IFile } from "types/cms";
import { TImageDimensions } from "types/custom";

export function getIFileUrl(imageData: IFile): string {
  const sizes = imageData?.formats;
  if (!!sizes) {
    return (
      sizes.large?.url ||
      sizes.medium?.url ||
      sizes.small?.url ||
      sizes.thumbnail?.url ||
      imageData.url
    );
  } else {
    return imageData?.url || "";
  }
}

export function slugToTitle(slug: string) {
  const words = slug.split("-");

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
}

export function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9-'()]/g, "-");
}

// Is a URL internal or to an outside site?
export const isAbsoluteUrl = (href: string) => {
  try {
    return !!new URL(href);
  } catch (e) {
    return false;
  }
};

export function getElemXY(elem: any) {
  let x = 0;
  let y = 0;
  if (elem.offsetParent) {
    do {
      x += elem.offsetLeft;
      y += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }
  return { x, y };
}

export const isElement = (node: Node): boolean => {
  return node instanceof Element || node instanceof Document;
};

export function resizeImage(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
): TImageDimensions {
  let newWidth = width;
  let newHeight = height;

  if (newWidth > maxWidth) {
    const aspectRatio = newWidth / newHeight;
    newWidth = maxWidth;
    newHeight = Math.round(newWidth / aspectRatio);
  }

  if (newHeight > maxHeight) {
    const aspectRatio = newWidth / newHeight;
    newHeight = maxHeight;
    newWidth = Math.round(newHeight * aspectRatio);
  }

  return { width: newWidth, height: newHeight };
}

export function extractImageDimensions(url: string): TImageDimensions | null {
  const regex = /\/(\d+)x(\d+)\//;
  const match = url.match(regex);

  if (match && match.length === 3) {
    const width = parseInt(match[1], 10);
    const height = parseInt(match[2], 10);

    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }

  return null;
}
