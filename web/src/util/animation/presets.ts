/* Re-usable framer-motion presets! */

/*
  Standard Transitions
  Feel free to add more, but the fewer we have and the more we re-use them,
  the more we can control the overall speed/pacing/feel of hte site.

  Transitions must provide a staggerChildren delay value if you want to use
  them in variants that are assigned to those children.
*/

const slow = {
  duration: 0.6,
  ease: "easeOut",
  staggerChildren: 0.2,
};

const slower = {
  duration: 1,
  ease: "easeOut",
  staggerChildren: 1,
};

const sluggish = {
  duration: 2,
  ease: "easeOut",
  staggerChildren: 1,
};

const delayed = {
  ...slow,
  delay: 0.6,
};
const delayedSlow = {
  ...slow,
  delay: 0.8,
};

/*
  Common place for shared framer-motion variants
  Establishes some naming conventions for show/hide variants.

  "Reveal" presets should have a "hide" and "reveal" variants.
*/

export const fadeUp = {
  hide: { opacity: 0, y: 24 },
  reveal: { opacity: 1, y: 0, transition: slow },
};

export const fadeUpDelay = {
  hide: { opacity: 0, y: 24 },
  reveal: { opacity: 1, y: 0, transition: delayed },
};
export const fadeUpDelaySlow = {
  hide: { opacity: 0, y: 24 },
  reveal: { opacity: 1, y: 0, transition: delayedSlow },
};

export const fadeDown = {
  hide: { opacity: 0, y: -24 },
  reveal: { opacity: 1, y: 0, transition: slow },
};

export const fadeIn = {
  hide: { opacity: 0 },
  reveal: { opacity: 1, transition: slower },
};

export const fadeInChildrenFast = {
  hide: { opacity: 0 },
  reveal: { opacity: 1, transition: slow },
};

export const fadeInChildren = {
  hide: { opacity: 0 },
  reveal: { opacity: 1, transition: sluggish },
};

export const fadeDownSlow = {
  hide: { opacity: 0, y: -24, transition: slower },
  reveal: { opacity: 1, y: 0, transition: slower },
};

export const fadeUpSlow = {
  hide: { opacity: 0, y: 24, transition: slower },
  reveal: { opacity: 1, y: 0, transition: slower },
};

export const fadeUpSlower = {
  hide: { opacity: 0, y: 24, transition: sluggish },
  reveal: { opacity: 1, y: 0, transition: sluggish },
};

export const fadeLeft = {
  hide: { opacity: 0, x: 24 },
  reveal: { opacity: 1, x: 0, transition: slow },
};

export const fadeRight = {
  hide: { opacity: 0, x: -24 },
  reveal: { opacity: 1, x: 0, transition: slow },
};

export const blurLeft = {
  hide: {
    filter: `blur(3px)`,
    opacity: 0,
    x: 48,
    transition: {
      ease: "easeIn",
      duration: 0.8,
    },
  },
  reveal: {
    filter: `blur(0px)`,
    opacity: 1,
    x: 0,
    transition: {
      ease: "easeOut",
      duration: 0.8,
    },
  },
};

/*
  No change, used for parents of staggered
  children with their own variants:
*/
export const stagger = {
  hide: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  reveal: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export default {
  stagger,
  fadeDown,
  fadeUpSlow,
  fadeUpSlower,
  fadeUp,
  fadeDownSlow,
  fadeLeft,
  fadeRight,
  blurLeft,
  fadeInChildren,
  fadeInChildrenFast,
};
