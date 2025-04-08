import React, { FC } from "react";
import { GetStaticProps } from "next";
import Page from "components/layout/Page/Page";
import Hero from "components/content/SectionHero/SectionHero";
import WhyJoin from "components/content/SectionWhyJoin/SectionWhyJoin";
import AboutUs from "components/content/SectionAboutUs/SectionAboutUs";
import FAQ from "components/content/SectionFAQ/SectionFAQ";
import contentHero from "data/sections/hero.json";
import contentHighlights from "data/sections/highlights.json";
import contentAbout from "data/sections/about.json";
import contentFAQ from "data/sections/faq.json";
import useSmoothHashScroll from "util/hooks/useSmoothHashScroll";
import { useRouter } from "next/router";
import { homepageAnchors } from "data/navigation";
import { MetaProps } from "components/shell/Meta/Meta";
import DataWrapperEmbed from "components/DataWrapperEmbed";
import DataWrapperTabs from "../components/ui/DataWrapperTabs/DataWrapperTabs";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SectionGraphs from "components/content/SectionGraphs/SectionGraphs";

const metaData: MetaProps = {
  title: "JHU Measles Tracker",
  description:
    "Measles outbreaks across several states have raised concerns about continued spread, increasing numbers of cases and deaths, and loss of measles elimination status, highlighting the importance of measles vaccination and ongoing surveillance efforts. Launched by Bloomberg Philanthropies with the Center for Government Excellence.",
  image: "images/meta-image.png",
};

export type TSectionCoreProps = {
  id: string;
  className?: string;
};

type HomeProps = {
  title?: string;
  image?: string;
};

const Home: FC<HomeProps> = ({ image }) => {
  const router = useRouter();
  const spits = router.asPath.split("#");
  const anchor = spits.length > 1 ? spits[1] : "";

  useSmoothHashScroll(anchor);

  return (
    <Page
      meta={{
        title: metaData.title,
        description: metaData.description,
        image: image || metaData.image,
      }}
    >
      <p>BOOP BOOP BOOP</p>
    </Page>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "FGS Global Site",
    },
    revalidate: 60,
  };
};
