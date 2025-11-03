import { Icon } from '@components/icon/Icon';

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
  const handleDeleteMessageClick = () => {
    handleDeleteMessage(messageId);
  };
  return (
    <div className='bg-grayscale-50 flex w-full items-start rounded-[1.6rem] p-[2rem]'>
      <div className='flex w-full flex-col items-start gap-[0.4rem]'>
        <span className='text-grayscale-900 title-sb-16'>
          {number.toString().padStart(2, '0')}
        </span>
        <p className='text-grayscale-700 caption-m-12'>{message}</p>
      </div>
      <button type='button' onClick={handleDeleteMessageClick}>
        <Icon name='ic_dot' className='text-grayscale-700 cursor-pointer' />
      </button>
    </div>
  );
}
