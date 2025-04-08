import React from "react";
import Button, { ButtonProps } from "./Button";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Basic UI/Button",
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Text = Template.bind({});
Text.args = {
  text: "Text",
};

export const OnClick = Template.bind({});
OnClick.args = {
  text: "Click Me",
  onClick: () => {
    console.log("You clicked a button");
  },
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
  text: "Link",
  href: "https://developer.mozilla.org/",
};
