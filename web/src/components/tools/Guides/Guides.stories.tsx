import React from "react";
import Guides, { GuideProps } from "./index";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Tools/Guides",
  component: Guides,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
} as Meta;

const Template: StoryFn<GuideProps> = (args) => <Guides {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Narrow = Template.bind({});
Narrow.args = { containerPreset: "narrow" };

export const Brackets = Template.bind({});
Brackets.args = { containerPreset: "bracket-all" };

export const GridSample = Template.bind({});
GridSample.args = { containerPreset: "bracket-all", showGridSample: true };
