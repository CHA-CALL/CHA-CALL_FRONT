import { Icon } from '../icon/Icon';

export interface ErrorTextProps {
  text: string;
}

export default function ErrorText({ text }: ErrorTextProps) {
  return (
    <div className='flex items-center gap-[0.4rem] w-full'>
      <Icon width={14} height={14} name='ic_error' color='#F83419' />
      <p className='caption-m-12 text-primary-700'>{text}</p>
    </div>
  );
}
