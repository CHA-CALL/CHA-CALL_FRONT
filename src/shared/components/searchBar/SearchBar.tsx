import { cva } from 'class-variance-authority';

interface SearchBarProps {
  type: 'icon' | 'button';
  rightComponent?: React.ReactNode;
  value: string;
  maxLength?: number;
  handleRightClick?: () => void;
}

const containerVariants = cva(
  'flex justify-end items-center  border border-grayscale-700 rounded-[1.6rem] w-[33.5rem] h-[5.4rem] flex-shrink-0',
  {
    variants: {
      type: {
        icon: 'gap-[15.2rem] pl-[2rem] pr-[1.6rem] py-[1.6rem]',
        button: 'gap-[10rem] w-[2.4rem] h-[2.4rem] rounded-full bg-primary-500',
      },
    },
    defaultVariants: {
      type: 'icon',
    },
  }
);

export default function SearchBar({
  value,
  type,
  rightComponent,
  handleRightClick,
  maxLength,
  ...props
}: SearchBarProps) {
  return (
    <div className={containerVariants({ type })}>
      <input {...props} maxLength={maxLength} />
      <div className='flex items-center gap-[1rem]'>
        {maxLength && (
          <div className='flex items-center gap-[0.1rem] text-grayscale-500 caption-m-12'>
            <span className='text-primary-700'>{value.length}</span>
            <span>/</span>
            <span className='caption-m-12'>{maxLength}</span>
          </div>
        )}
        {rightComponent && (
          <button onClick={handleRightClick}>{rightComponent}</button>
        )}
      </div>
    </div>
  );
}
