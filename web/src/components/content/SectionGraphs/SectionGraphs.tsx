import React, { FC } from "react";
import DataWrapperTabs from "../../ui/DataWrapperTabs/DataWrapperTabs";
import DataWrapperEmbed from "../../DataWrapperEmbed";

interface SectionGraphsProps {
  id?: string;
  className?: string;
}

const SectionGraphs: FC<SectionGraphsProps> = ({ id, className }) => {
  return (
    <section id={id} className={className}>
      <p>
        The following time series visualizations show the progression of measles
        cases over time, both cumulatively across the United States and as
        bi-weekly incidences in selected states.
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
        of measles cases reported to date in 2025 in the United States compared
        with previous years. The sharp upward slope of the curve in 2025
        reflects the rapid spread of measles virus this year.
      </p>

      <p>
        The second timeseries presents the number of cases reported bi-weekly in
        those states reporting outbreaks in 2025, representing incidence curves,
        and highlighting the magnitude of the Texas outbreak relative to other
        states.
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
        measles cases. The data highlights that measles outbreaks are prevented
        by measles vaccination.
      </p>
    </section>
  );
};

export default SectionGraphs;
