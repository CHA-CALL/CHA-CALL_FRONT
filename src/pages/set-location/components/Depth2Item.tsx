import { cn } from '@shared/utils/cn';

interface Depth2ItemProps {
  title: string;
  isSelected?: boolean;
  handleSelectDepth2: () => void;
}
const BaseClass =
  'w-full h-[4.2rem] px-[2rem] py-[0.7rem] bg-white body-m-14 text-grayscale-700';

export default function Depth2Item({
  title,
  isSelected = false,
  handleSelectDepth2,
}: Depth2ItemProps) {
  return (
    <button
      type='button'
      onClick={handleSelectDepth2}
      className={cn(
        BaseClass,
        isSelected && 'bg-primary-50 title-sb-14 text-primary-700'
      )}
    >
      {title}
    </button>
  );
}
