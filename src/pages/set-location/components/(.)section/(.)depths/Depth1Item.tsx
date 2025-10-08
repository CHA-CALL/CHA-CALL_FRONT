import { cn } from '@shared/utils/cn';

interface Depth1ItemProps {
  title: string;
<<<<<<<< HEAD:src/pages/set-location/components/Depth1Item.tsx
  isSelected: boolean;
========
  isSelected?: boolean;
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth1Item.tsx
  handleSelectDepth1: () => void;
}

const BaseClass =
  'w-full h-[4.2rem] px-[2rem] py-[0.7rem] bg-white title-sb-14 text-grayscale-700';

export default function Depth1Item({
  title,
<<<<<<<< HEAD:src/pages/set-location/components/Depth1Item.tsx
  isSelected,
========
  isSelected = false,
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth1Item.tsx
  handleSelectDepth1,
}: Depth1ItemProps) {
  return (
    <button
      type='button'
      onClick={handleSelectDepth1}
      className={cn(
        BaseClass,
        isSelected && 'bg-primary-700 text-white title-b-14'
      )}
    >
      {title}
    </button>
  );
}
