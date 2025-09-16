import { Icon } from "@shared/components/icon/Icon";

export interface ErrorTextProps {
  text: string;
}

export default function ErrorText({ text }: ErrorTextProps) {
  return (
    <div className="flex w-full items-center gap-[0.4rem]">
      <Icon width={14} height={14} name="ic_error" color="#F83419" />
      <p className="text-primary-700 caption-m-12">{text}</p>
    </div>
  );
}
