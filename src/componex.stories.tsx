import { Meta, StoryObj } from "@storybook/react";
import componex from ".";

const Button = componex("button", {
  cva: {
    variants: {
      variant: {
        primary: "bg-blue-500",
        secondary: "bg-red-500",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
});

const meta: Meta<typeof Button> = {
  title: "componex",
  component: Button,
};

export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Click me",
    variant: "primary",
  },
};
