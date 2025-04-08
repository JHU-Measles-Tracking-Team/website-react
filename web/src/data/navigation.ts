export type TRouteBase = {
  id: string;
  label: string;
  href?: string;
};
export type TRoute = {
  id: string;
  label: string;
  href?: string;
  subItems?: TRouteBase[];
};

export const homepageAnchors = {
  home: "welcome",
  maps: "maps",
  tables: "tables",
  graphs: "graphs",
};

export const basePaths = {
  home: "/#welcome",
  maps: "/#maps",
  tables: "/#tables",
  graphs: "/#graphs",
};

export const headerRoutes: TRoute[] = [
  {
    label: "Maps",
    id: "maps",
    href: basePaths["maps"],
  },
  {
    label: "Tables",
    id: "tables",
    href: basePaths["tables"],
  },
  {
    label: "Graphs",
    id: "graphs",
    href: basePaths["graphs"],
  },
];

export const footerLinks: TRoute[] = [
  {
    id: "jhu",
    label: "©️ 2024 Johns Hopkins University",
    href: basePaths["home"],
  },
  {
    id: "privacy-policy",
    label: "Privacy Policy",
    href: "https://it.johnshopkins.edu/policies-privacystatement",
  },
  {
    id: "linkedIn",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/govex/",
  },
  {
    id: "twitter",
    label: "Twitter",
    href: "http://twitter.com/govex_jhu",
  },
];

export const loginUrl = "https://app.civicroundtable.com/cityaiconnect-login";
export const signUpUrl = loginUrl;

export const draftGuardRoutes = [];

const evaluateDraftGuard = (route: TRoute): boolean => {
  return true; // shouldShowDrafts || !draftGuardRoutes.includes(route.key);
};

export const getHeaderRoutes = (): {
  desktop: TRoute[];
  mobile: TRoute[];
} => {
  return {
    desktop: headerRoutes.filter((route) => {
      return evaluateDraftGuard(route);
    }),
    mobile: headerRoutes.filter((route) => {
      return evaluateDraftGuard(route);
    }),
  };
};
