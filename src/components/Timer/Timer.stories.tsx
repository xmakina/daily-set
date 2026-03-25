import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./Timer";

const meta = {
  component: Subject,
  args: {},
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
export const WhenStopped = {
  args: {
    stopped: true,
  },
};
