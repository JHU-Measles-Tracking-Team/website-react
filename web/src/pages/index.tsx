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
      <section id={homepageAnchors["welcome"]}>
        <h1>Where Measles Outbreaks Are Spreading in the U.S.</h1>
        <p>
          Measles outbreaks across several states have raised concerns about
          continued spread, increasing numbers of cases and deaths, and loss of
          measles elimination status, highlighting the importance of measles
          vaccination and ongoing surveillance efforts. The map below shows the
          current geographic distribution of confirmed measles cases in 2025 by
          county across the United States.
        </p>
      </section>

      <section id={homepageAnchors["maps"]}>
        <DataWrapperTabs
          tabs={[
            {
              id: "cumulative",
              label: "Cumulative Cases",
              identifier: "Cxrb1",
              title: "Measles Cases (Cumulative)",
              ariaLabel: "Map",
              height: "538",
            },
            {
              id: "recent",
              label: "Recent Cases",
              identifier: "D5Lgc",
              title: "Measles Cases (Recent)",
              ariaLabel: "Map",
              height: "538",
            },
          ]}
        />
      </section>

      <section id={homepageAnchors["tables"]}>
        <p>
          The table below provides cumulative and recent measles case counts,
          and whether imported or locally acquired, for each county where
          confirmed measles cases were reported in 2025.
        </p>

        <DataWrapperEmbed
          identifier="VFJ8p"
          title="Measles Cases (Cumulative and Recent)"
          ariaLabel="Table"
          height="538"
        />
      </section>

      <section id={homepageAnchors["graphs"]}>
        <p>
          The following time series visualizations show the progression of
          measles cases over time, both cumulatively across the United States
          and as bi-weekly incidences in selected states.
        </p>

        <DataWrapperTabs
          tabs={[
            {
              id: "cumulative",
              label: "Cumulative Cases",
              identifier: "hAu4Z",
              title: "Measles Cases (Cumulative)",
              ariaLabel: "Chart",
              height: "538",
            },
            {
              id: "bi-weekly",
              label: "Bi-weekly Incidences",
              identifier: "ziTC0",
              title: "Measles Cases (Bi-weekly Incidences)",
              ariaLabel: "Chart",
              height: "538",
            },
          ]}
        />

        <p>
          In the national time series the trend line shows the cumulative number
          of measles cases reported to date in 2025 in the United States
          compared with previous years. The sharp upward slope of the curve in
          2025 reflects the rapid spread of measles virus this year.
        </p>

        <p>
          The second timeseries presents the number of cases reported bi-weekly
          in those states reporting outbreaks in 2025, representing incidence
          curves, and highlighting the magnitude of the Texas outbreak relative
          to other states.
        </p>

        <DataWrapperEmbed
          identifier="6rApt"
          title="Measles Cases by Vaccination Status"
          ariaLabel="Stacked Bars"
          height="201"
        />

        <p>
          The data demonstrate a clear correlation between measles vaccination
          status and likelihood of contracting measles, and are consistent with
          estimates that two doses of measles vaccine protects 97% of those
          vaccinated. Unvaccinated individuals represent almost all reported
          measles cases. The data highlights that measles outbreaks are
          prevented by measles vaccination.
        </p>
      </section>

      {/* <SectionGraphs id={homepageAnchors["graphs"]} /> */}
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
