import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import "styles/main.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "light",
  },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      // TODO: Explore a way to set layout: 'fullscreen' for this viewport
      // and set width back to 375px
      mobile1: {
        name: "Small mobile - minimum supported",
        type: "mobile",
        styles: {
          // 375px + 2 * 16px for default Storybook body padding
          width: "407px",
          height: "600px",
        },
      },
      mobile2: {
        name: "Large mobile",
        type: "mobile",
        styles: {
          width: "444px",
          height: "914px",
        },
      },
      tablet2: {
        name: "Large tablet",
        type: "tablet",
        styles: {
          width: "969px",
          height: "1112px",
        },
      },
    },
  },
};
