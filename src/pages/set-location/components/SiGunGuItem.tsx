import { cn } from '@shared/utils/cn';

interface SiGunGuItemProps {
  title: string;
  isSelected: boolean;
  handleSelectSiGunGu: () => void;
}
const BaseClass =
  'w-full h-[4.2rem] px-[2rem] py-[0.7rem] bg-white body-m-14 text-grayscale-700';

export default function SiGunGuItem({
  title,
  isSelected,
  handleSelectSiGunGu,
}: SiGunGuItemProps) {
  return (
    <button
      type='button'
      onClick={handleSelectSiGunGu}
      className={cn(
        BaseClass,
        isSelected && 'bg-primary-50 title-sb-14 text-primary-700'
      )}
    >
      {title}
    </button>
  );
}
