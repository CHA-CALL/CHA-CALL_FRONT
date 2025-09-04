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
    <nav className='sticky top-[0] left-[0] right-[0] w-full h-[4.8rem] grid grid-cols-3 items-center bg-white z-30'>
      <div className='h-full flex justify-start items-center p-[1.3rem]'>
        {leftIcon && <button onClick={handleLeftClick}>{leftIcon}</button>}
      </div>
      <div className='h-full flex justify-center items-center'>
        {text && <span className='title-sb-16 text-grayscale-900'>{text}</span>}
      </div>
      <div className='h-full flex justify-end items-center pr-[2rem] py-[1rem]'>
        {rightIcon && <button onClick={handleRightClick}>{rightIcon}</button>}
      </div>
    </nav>
  );
}
