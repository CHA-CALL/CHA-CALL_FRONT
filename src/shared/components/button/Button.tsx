import { cn } from '@utils/cn';

export interface ButtonProps {
  children: React.ReactNode;
  variant: ButtonVariant;
  buttonStyle: ButtonStyle;
  handleClick?: () => void;
}

export const ButtonClasses = {
  cta: {
    base: 'w-[34.3rem] h-[5rem] px-[1.24rem] py-[1.3rem] rounded-[1.6rem] title-sb-16',
    active: 'bg-primary-700 text-white',
    disabled: 'bg-primary-100 text-white cursor-not-allowed',
    sub: 'bg-white text-grayscale-700 border border-grayscale-200',
  },
  chip: {
    base: 'px-[1.6rem] py-[0.8rem] rounded-[2rem] caption-m-12',
    default: 'bg-white text-grayscale-700 border border-grayscale-200',
    selected1: 'bg-primary-700 text-white',
    selected2: 'bg-primary-50 text-primary-700 border border-primary-700',
  },
  verify: {
    base: 'w-[7rem] h-[3.6rem] px-[1.4rem] py-[0.9rem] rounded-[0.8rem] caption-m-12',
    active: 'bg-primary-700 text-white',
    disabled: 'bg-primary-100 text-white cursor-not-allowed',
  },
} as const;

export type ButtonVariant = keyof typeof ButtonClasses;
export type ButtonStyle =
  | 'active'
  | 'disabled'
  | 'sub'
  | 'default'
  | 'selected1'
  | 'selected2';

export default function Button({
  children,
  variant,
  buttonStyle,
  handleClick,
  ...props
}: ButtonProps) {
  const baseClasses = ButtonClasses[variant].base;
  const styleClasses =
    ButtonClasses[variant][
      buttonStyle as keyof (typeof ButtonClasses)[typeof variant]
    ];

  return (
    <button
      className={cn(baseClasses, styleClasses)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
