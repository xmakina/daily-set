import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./SetGrid";
import { buildPuzzle } from "set.ts";
import { fn } from "storybook/test";

const meta = {
  component: Subject,
  args: {
    puzzle: buildPuzzle(12, 6, 123),
    onClick: fn(),
    onWrong: fn(),
    onCorrect: fn(),
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
