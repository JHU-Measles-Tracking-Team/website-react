/*

  Reveal Motion:
  Short-hand for triggering a framer-motion friendly "preset"
  when an element enters the viewport.

  Use observerProps to customize the intersection observer behavior:
    https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

  Use `tagName` prop to change the wrapper from a <div> to something else.
  This must be a valid motion.? component name, eg motion.div or motion.span

  Staggering Children:
    TL;DR:
      - Remember the <RevealMotion />'s container is the trigger, not the children themselves.
      - The container's variants (preset) must have a valid transition.staggerChildren value.
      - In order to react to the trigger, the children must be motion components w/variants, eg:
        <RevealMotion>
          <motion.div variants={fadeUp}>One!</div>
          <motion.div variants={fadeUp}>Two!</div>
          <motion.div variants={fadeUp}>Three!</div>
          <div>Four?</div> << won't animate!
        </RevealMotion>

  Add presets to and import presets from "util/animation/presets"

*/

import React, { FC, useEffect } from "react";
import cx from "classnames";

import { motion } from "framer-motion";
import animationPresets from "util/animation/presets";
import { useInView } from "react-intersection-observer";
import useWindowDimensions from "util/hooks/useWindowDimensions";

type ObserverProps = {
  threshold?: number | number[];
  rootMargin?: string;
};

type RevealMotionProps = {
  tagName?: keyof typeof motion;
  observerProps?: ObserverProps;
  preset?: string;
  children?: React.ReactNode;
  staggerChildren?: boolean;
  className?: string;
  triggerOnce?: boolean;
  onMove?: (bol: boolean) => void;
};

const RevealMotion: FC<RevealMotionProps> = ({
  tagName = "div",
  preset = "fadeUp",
  observerProps = {},
  children,
  className,
  triggerOnce = false,
  onMove,
}) => {
  // Cast as any, ts error caused by complex union type
  const MotionComponent: any = motion[tagName];
  const variants = (animationPresets as any)[preset];

  const [width] = useWindowDimensions();

  const defaultObserverProps = {
    threshold: width && width <= 768 ? 0.1 : 0.2,
  };

  const { ref, inView } = useInView({
    ...defaultObserverProps,
    ...observerProps,
    triggerOnce,
  });

  useEffect(() => {
    !!onMove && onMove(inView);
  }, [inView, onMove]);

  return (
    <MotionComponent
      ref={ref}
      variants={variants}
      initial="hide"
      animate={inView ? "reveal" : "hide"}
      className={cx(className, { inView: inView })}
    >
      {children}
    </MotionComponent>
  );
};

export default RevealMotion;
