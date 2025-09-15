import { cn } from '@shared/utils/cn';

interface SiDoItemProps {
  title: string;
  isSelected: boolean;
  handleSelectSiDo: () => void;
}
const BaseClass =
  'w-full h-[4.2rem] px-[2rem] py-[0.7rem] bg-white title-sb-14 text-grayscale-700';

export default function SiDoItem({
  title,
  isSelected,
  handleSelectSiDo,
}: SiDoItemProps) {
  return (
    <button
      onClick={handleSelectSiDo}
      className={cn(
        BaseClass,
        isSelected && 'bg-primary-700 title-b-14 text-white'
      )}
    >
      {title}
    </button>
  );
}
