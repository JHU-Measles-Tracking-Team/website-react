import React, { useState, useEffect, useContext, createContext } from "react";

export const SectionContext = createContext({});

export function useSectionHeights() {
  const context = useContext(SectionContext);

  if (!context) {
    throw new Error("useSectionHeights must be used within a SectionProvider");
  }
  return context;
}

export const getWindowCenter = () => {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset;
  return scrollY + windowHeight / 2;
};

export const getFocusedSection = (sections, windowCenter) => {
  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;

    if (windowCenter >= sectionTop && windowCenter <= sectionBottom) {
      return section;
    }
  }
  return null; // Return null if no section is in focus
};

export const scrollToFocusedSection = (focusedSection) => {
  if (focusedSection) {
    focusedSection.scrollIntoView({
      behavior: "smooth",
      block: "center", // Scroll so the focused section is centered in the window
    });
  }
};

export const getSectionHeightKey = (scrollPercentage, sectionHeights) => {
  let closestKey = null;
  let closestDistance = Number.MAX_VALUE;

  // Iterate through section heights to find the closest section
  for (const [key, { min, max }] of Object.entries(sectionHeights)) {
    if (scrollPercentage >= min && scrollPercentage <= max) {
      return key; // Return the key if the scrollPercentage is within this section's range
    }

    // Calculate the distance to the closest section
    const distance = Math.min(
      Math.abs(scrollPercentage - min),
      Math.abs(scrollPercentage - max)
    );

    if (distance < closestDistance) {
      closestDistance = distance;
      closestKey = key;
    }
  }
  // Return the closest section key if scrollPercentage is out of all ranges
  return closestKey;
};

export function SectionProvider({ children }) {
  const [sectionHeights, setSectionHeights] = useState({});

  useEffect(() => {
    const updateSectionHeights = () => {
      const sections = Array.from(document.querySelectorAll("section")); // Assuming your sections are <section> elements
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const sectionHeightsObject = {};

      sections.forEach((section) => {
        const id = section.id;
        const height = section.clientHeight;
        const min = (section.offsetTop / documentHeight) * 100;
        const max = ((section.offsetTop + height) / documentHeight) * 100;

        sectionHeightsObject[id] = {
          height,
          min,
          max,
        };
      });

      setSectionHeights(sectionHeightsObject);
    };

    window.addEventListener("resize", updateSectionHeights);
    updateSectionHeights();

    return () => {
      window.removeEventListener("resize", updateSectionHeights);
    };
  }, []);

  return (
    <SectionContext.Provider value={sectionHeights}>
      {children}
    </SectionContext.Provider>
  );
}
