import { Icon } from '@shared/components/icon/Icon';

interface MessageProps {
  number: number;
  message: string;
  messageId: string;
  handleDeleteMessage: (_messageId: string) => void;
}

export default function Message({
  number,
  message,
  messageId,
  handleDeleteMessage,
}: MessageProps) {
  return (
    <div className='bg-grayscale-50 flex w-full items-start rounded-[1.6rem] p-[2rem]'>
      <div className='flex w-full flex-col items-start gap-[0.4rem]'>
        <span className='title-sb-16 text-grayscale-900'>
          {number.toString().padStart(2, '0')}
        </span>
        <p className='caption-m-12 text-grayscale-700'>{message}</p>
      </div>
      <Icon
        name='ic_dot'
        color='#565B65'
        className='cursor-pointer'
        onClick={() => handleDeleteMessage(messageId)}
      />
    </div>
  );
}
