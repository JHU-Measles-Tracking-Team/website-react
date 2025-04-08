import React from "react";
import CopyToClipboard, { CopyToClipboardProps } from "./index";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Tools/CopyToClipboard",
  component: CopyToClipboard,
  argTypes: {
    children: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
  },
} as Meta;

const Template: StoryFn<CopyToClipboardProps> = (args) => (
  <CopyToClipboard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <p style={{ padding: 16 }}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo tempora,
      molestiae minima fuga, magni illum aspernatur, aliquam laudantium
      asperiores vel est! Corrupti, quidem unde! Quos nemo tempora quas quasi
      ipsum.
    </p>
  ),
};
