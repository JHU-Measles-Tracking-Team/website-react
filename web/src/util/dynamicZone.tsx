import React from "react";
// import cx from "classnames";

/**
 * Dynamic zone handler is decoupled from page render code.
 *
 * Separate advanced logic into its own helper funcs
 *
 * Config is passed down from the page context. It might be used to:
 * - Add page-specific props or classNames
 *
 * Additional Data is different from config. It might be used to:
 * - Pass in a separately-fetched collection which is required in the component logic
 * - Pass an async callback declared on the page to its component
 *
 * Be sure to use type aliases and reuse transform functions from ./transform.
 */

interface Config {
  [typename: string]: any;
}

export default (
  cmsSections: any[], // Add gql-query union type here
  pageConfig = {} as Config,
  additionalData = {} as Config,
) => {
  const sections: React.ReactNode[] = [];

  if (!cmsSections) return sections;

  cmsSections.forEach((section, i) => {
    const config = pageConfig?.[section.__typename] || {};
    const data = additionalData?.[section.__typename] || {};

    switch (section.__typename) {
      /** Sample pattern - remove mr during Assembly */

      // case "ComponentSectionMyCMSComponent":
      //   const data =
      //   section as CMSType;
      // const typed_section_props = transformFunc(data);
      // sections.push(
      //   <MySectionComponent
      //     {...typed_section_props}
      //     key={`section-${i + 1}`}
      //     className={config.className}
      //   />
      // );
      // break;

      default:
        return null;
    }
  });

  return sections;
};
