import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject from "./SetCard";
import {
  COLORS,
  NUMBERS,
  SHADINGS,
  SHAPES,
} from "set.ts/dist/src/model/SetCard";

const meta = {
  component: Subject,
  argTypes: {
    color: {
      options: COLORS,
    },
    shading: {
      options: SHADINGS,
    },
    number: {
      options: NUMBERS,
    },
    shape: {
      options: SHAPES,
    },
  },
  args: {
    color: "red",
    shading: "solid",
    number: 1,
    shape: "diamond",
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
