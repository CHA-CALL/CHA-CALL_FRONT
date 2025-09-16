import React from "react";
import { cn } from "@utils/cn";

export const ButtonClasses = {
  cta: {
    base: "w-full h-[5rem] px-[1.24rem] py-[1.3rem] rounded-[1.6rem] title-sb-16",
    active: "bg-primary-700 text-white",
    disabled:
      "bg-primary-100 text-white cursor-not-allowed pointer-events-none",
    sub: "bg-white text-grayscale-700 border border-grayscale-200",
  },
  chip: {
    base: "px-[1.6rem] py-[0.8rem] rounded-[2rem] caption-m-12",
    default: "bg-white text-grayscale-700 border border-grayscale-200",
    selected1: "bg-primary-700 text-white",
    selected2: "bg-primary-50 text-primary-700 border border-primary-700",
  },
  verify: {
    base: "w-[7rem] h-[3.6rem] px-[1.4rem] py-[0.9rem] rounded-[0.8rem] caption-m-12",
    active: "bg-primary-700 text-white",
    disabled: "bg-primary-100 text-white cursor-not-allowed",
  },
  default: {
    base: "rounded-[0.4rem] border border-grayscale-200 bg-white",
    large: "w-full h-[4.6rem] px-[11.4rem] py-[1.5rem] title-sb-14",
    medium: "h-[2.8rem] px-[1.85rem] py-[0.5rem] caption-m-12",
    edit: "px-[1.25rem] py-[0.5rem] caption-m-12 text-grayscale-700",
  },
} as const;

type VariantStyleMap = {
  cta: "active" | "disabled" | "sub";
  chip: "default" | "selected1" | "selected2";
  verify: "active" | "disabled";
  default: "large" | "medium" | "edit";
};

type ButtonProps<V extends keyof VariantStyleMap = keyof VariantStyleMap> =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant: V;
    buttonStyle: VariantStyleMap[V];
    handleClickButton?: () => void;
  };

export default function Button({
  children,
  variant,
  buttonStyle,
  handleClickButton,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = ButtonClasses[variant].base;
  const styleClasses =
    ButtonClasses[variant][
      buttonStyle as keyof (typeof ButtonClasses)[typeof variant]
    ];

  return (
    <button
      type="button"
      className={cn(baseClasses, styleClasses, className)}
      onClick={handleClickButton}
      disabled={buttonStyle == "disabled"}
      {...props}
    >
      {children}
    </button>
  );
}
