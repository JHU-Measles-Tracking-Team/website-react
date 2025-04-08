import React, { FC } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const isServer = () => typeof window === `undefined`;

const PageRedirect = (props) => {
  const router = useRouter();

  if (isServer()) return null;

  if (router.pathname !== "/") {
    router.push("/");
    return null; // Return null to prevent rendering content on the old page
  }
};

export default PageRedirect;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "FGS Global Site",
    },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
