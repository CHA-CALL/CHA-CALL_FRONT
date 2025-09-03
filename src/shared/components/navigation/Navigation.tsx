interface NavigationProps {
  leftIcon?: React.ReactNode;
  handleLeftClick?: () => void;
  rightIcon?: React.ReactNode;
  handleRightClick?: () => void;
  text?: string;
}

export default function Navigation({
  leftIcon,
  handleLeftClick,
  rightIcon,
  handleRightClick,
  text,
}: NavigationProps) {
  return (
    <div>
      <nav className='sticky top-0 w-full h-[4.8rem] grid grid-cols-3 items-center bg-white z-50 px-4'>
        <div className='flex justify-start'>
          {leftIcon && <button onClick={handleLeftClick}>{leftIcon}</button>}
        </div>
        <div className='flex justify-center'>
          {text && (
            <span className='text-title-sb-16 text-grayscale-900'>{text}</span>
          )}
        </div>
        <div className='flex justify-end'>
          {rightIcon && <button onClick={handleRightClick}>{rightIcon}</button>}
        </div>
      </nav>
    </div>
  );
}
