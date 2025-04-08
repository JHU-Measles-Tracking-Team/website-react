import React from "react";
import TextStyles, { TextStylesProps } from "./TextStyles";
import { Meta, StoryFn } from "@storybook/react";

export default {
  title: "Style Guide/Text Styles",
  component: TextStyles,
} as Meta;

const Template: StoryFn<TextStylesProps> = (args) => <TextStyles {...args} />;

export const Default = Template.bind({});
Default.args = {};
