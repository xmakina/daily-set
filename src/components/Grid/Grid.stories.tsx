import type { Meta, StoryObj } from "@storybook/react-vite";
import Subject, { type ItemDetails } from "./Grid";
import { fn } from "storybook/test";
import type { ReactNode } from "react";

const meta = {
  component: Subject,
  args: {
    onClick: fn(),
    items: [1, 2, 3, 4, 5, 6].map<ItemDetails<ReactNode>>((val) => ({
      item: <div className="border-2 w-full h-full">{val}</div>,
    })),
  },
} satisfies Meta<typeof Subject>;

export default meta;

type Story = StoryObj<typeof Subject>;

export const Default: Story = {};
