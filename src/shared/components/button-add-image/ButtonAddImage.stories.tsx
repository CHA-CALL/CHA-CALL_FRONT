import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ButtonAddImage from "@components/button-add-image/ButtonAddImage";

const meta: Meta<typeof ButtonAddImage> = {
  title: "Components/ButtonAddImage",
  component: ButtonAddImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    handleFileChange: {
      action: "fileSelected",
      description: "파일 첨부시 실행되는 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      alert(
        `첨부한 파일: ${files?.[0]?.name}, ${files?.[0]?.type}, ${files?.[0]?.size}`
      );
    },
  },
};
