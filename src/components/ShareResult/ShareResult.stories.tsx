import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./ShareResult";

const meta = {
  component: Subject,
  args: {
    guesses: 7,
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
