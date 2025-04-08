import React from "react";
import Typography from "./ColorPalette";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Style Guide/Color Palette",
  component: Typography,
} as Meta;

const Template: StoryFn = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {};
