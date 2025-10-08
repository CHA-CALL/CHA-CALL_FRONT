import { cn } from '@shared/utils/cn';

interface Depth1ItemProps {
  title: string;
  isSelected?: boolean;
  handleSelectDepth1: () => void;
}

const BaseClass =
  'w-full h-[4.2rem] px-[2rem] py-[0.7rem] bg-white title-sb-14 text-grayscale-700';

export default function Depth1Item({
  title,
  isSelected = false,
  handleSelectDepth1,
}: Depth1ItemProps) {
  return (
    <button
      type='button'
      onClick={handleSelectDepth1}
      className={cn(
        BaseClass,
        isSelected && 'bg-primary-700 title-b-14 text-white'
      )}
    >
      {title}
    </button>
  );
}
