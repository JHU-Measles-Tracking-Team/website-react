import React, { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { IFile } from "types/cms";
import { getIFileUrl } from "util/helper";

/**
 * The Meta component has a much more minimal role than it previously had.
 *
 * The Meta component is *solely* responsible for providing an easy interface to
 * override the default title, description, and/or image.
 *
 * The implementation of dynamic titles and string manipulations is left to
 * individual page components, which should use the Meta component to set the
 * page metadata to its final value.
 */

export interface MetaProps {
  title: string;
  description: string;
  image: any;
  // image: IFile;
}

const Meta: FC<MetaProps> = ({ title, description, image }) => {
  const router = useRouter();
  const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
  const host = process.env.NEXT_PUBLIC_HOST;
  const siteUrl =
    !!protocol && protocol !== "undefined"
      ? `${protocol}://${host}`
      : `${host}`;
  const imageSrc =
    typeof image === "string" ? `${siteUrl}/${image}` : getIFileUrl(image);

  return (
    <Head>
      <meta property="og:url" content={siteUrl} />
      <link rel="canonical" href={siteUrl} />
      {!!title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} key="og_title" />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {!!description && (
        <>
          <meta name="description" content={description} key="description" />
          <meta
            property="og:description"
            content={description}
            key="og_description"
          />
          <meta name="twitter:description" content={description} />
        </>
      )}
      {!!image && (
        <>
          <meta
            name="twitter:card"
            content="summary_large_image"
            key="twitter_card_type"
          />
          <meta name="twitter:image" content={imageSrc} />
          <meta property="og:image" content={imageSrc} key="og_image" />
          <meta
            property="og:image:secure_url"
            content={imageSrc}
            key="og_image_secure"
          />
        </>
      )}
    </Head>
  );
};

export default Meta;
