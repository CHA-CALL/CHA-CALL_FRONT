import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@utils/cn';

interface RegionButtonProps {
  text: string;
  handleClick: () => void;
}
export default function RegionButton({ text, handleClick }: RegionButtonProps) {
  return (
    <button
      type='button'
      onClick={handleClick}
      className={cn(
        'border-grayscale-300 flex w-full cursor-pointer items-start gap-[1.2rem] rounded-[1.6rem] border px-[2rem] py-[1.6rem]',
        text.length > 0 ? 'text-grayscale-700' : 'text-grayscale-300'
      )}
    >
      <Icon name='ic_locate' className='mt-[0.2rem] flex-shrink-0' />
      <span className='body-m-14 min-w-0 flex-1 whitespace-normal break-words text-left'>
        {text.length > 0 ? text : '위치를 선택해주세요.'}
      </span>
    </button>
  );
}
