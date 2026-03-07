import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./Clickable";
import { fn } from "storybook/test";

const meta = {
  component: Subject,
  args: {
    onClick: fn(),
    children: <p>Hello World</p>,
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
export const WhenHighlighted: Story = {
  args: {
    highlighted: true,
  },
};
