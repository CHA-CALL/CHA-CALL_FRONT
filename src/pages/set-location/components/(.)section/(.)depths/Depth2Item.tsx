import { cn } from '@shared/utils/cn';

interface Depth2ItemProps {
  title: string;
<<<<<<<< HEAD:src/pages/set-location/components/Depth2Item.tsx
  isSelected: boolean;
========
  isSelected?: boolean;
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth2Item.tsx
  handleSelectDepth2: () => void;
}

const BaseClass =
  'w-full h-[4.2rem] px-[2rem] py-[0.7rem] bg-white body-m-14 text-grayscale-700';

export default function Depth2Item({
  title,
<<<<<<<< HEAD:src/pages/set-location/components/Depth2Item.tsx
  isSelected,
========
  isSelected = false,
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth2Item.tsx
  handleSelectDepth2,
}: Depth2ItemProps) {
  return (
    <button
      type='button'
      onClick={handleSelectDepth2}
      className={cn(
        BaseClass,
        isSelected && 'bg-primary-50 text-primary-700 title-sb-14'
      )}
    >
      {title}
    </button>
  );
}
