import type { ChangeEvent, TextareaHTMLAttributes } from 'react';
import { cn } from '@utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  placeholder?: string;
  handleChange: (_e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  className?: string;
}

export default function Textarea({
  value,
  placeholder = '텍스트를 입력해주세요.',
  handleChange,
  maxLength,
  className,
  ...props
}: TextareaProps) {
  return (
    <textarea
      className={cn(
        'body-m-14 text-grayscale-900 border-grayscale-300 caret-primary-700 placeholder:body-m-14 placeholder:text-grayscale-300 focus:border-grayscale-500 rounded-[1.6rem] px-[2rem] py-[1.65rem] focus:outline-none',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      maxLength={maxLength}
      {...props}
    />
  );
}
