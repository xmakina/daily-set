import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./DailyPuzzle";
import { fn } from "storybook/test";

const meta = {
  component: Subject,
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {
  args: {
    time: new Date(new Date(2000, 1, 1).setUTCHours(0, 0, 0, 0)).getTime(),
    onClick: fn(),
  },
};
