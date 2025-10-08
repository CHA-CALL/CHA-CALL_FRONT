import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface Depth3ItemProps {
  title: string;
<<<<<<<< HEAD:src/pages/set-location/components/Depth3Item.tsx
  isSelected: boolean;
========
  isSelected?: boolean;
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth3Item.tsx
  handleSelectDepth3: () => void;
}

const BaseClass =
  'w-full h-[4.2rem] px-[1rem] py-[0.7rem] bg-white body-m-14 text-grayscale-700';

export default function Depth3Item({
  title,
<<<<<<<< HEAD:src/pages/set-location/components/Depth3Item.tsx
  isSelected,
========
  isSelected = false,
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth3Item.tsx
  handleSelectDepth3,
}: Depth3ItemProps) {
  return (
    <button
      type='button'
      onClick={handleSelectDepth3}
      className={cn(
        BaseClass,
        isSelected &&
          'relative flex items-center justify-center px-[1rem] text-primary-700 title-sb-14'
      )}
    >
      {isSelected && (
        <Icon
<<<<<<<< HEAD:src/pages/set-location/components/Depth3Item.tsx
          name={'ic_check'}
          className='absolute left-[1rem] text-primary-700'
========
          name='ic_check'
          className='text-primary-700 absolute left-[1rem]'
>>>>>>>> develop:src/pages/set-location/components/(.)section/(.)depths/Depth3Item.tsx
        />
      )}
      <p className='relative flex items-center justify-center'>{title}</p>
    </button>
  );
}
