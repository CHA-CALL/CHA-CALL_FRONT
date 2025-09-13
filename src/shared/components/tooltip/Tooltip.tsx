import { Icon } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface TooltipProps {
  text: string;
  isTooltipVisible: boolean;
  handleCloseTooltip: () => void;
  positionOffsetY: number;
  positionOffsetX: number;
  horizontalAlign?: 'left' | 'right';
  verticalAlign?: 'top' | 'bottom';
}

export default function Tooltip({
  text,
  isTooltipVisible,
  handleCloseTooltip,
  positionOffsetY,
  positionOffsetX,
  horizontalAlign = 'right',
  verticalAlign = 'bottom',
}: TooltipProps) {
  if (!isTooltipVisible) return null;

  const containerClass = cn(
    'absolute w-max',
    verticalAlign === 'bottom' ? 'pt-[1.1rem]' : 'pb-[1.1rem]'
  );

  const containerStyle: React.CSSProperties = {
    top: `${positionOffsetY}rem`,
    ...(horizontalAlign === 'right'
      ? { right: `${positionOffsetX}rem` }
      : { left: `${positionOffsetX}rem` }),
  };

  const arrowStyle: React.CSSProperties =
    horizontalAlign === 'right' ? { right: '1.6rem' } : { left: '1.6rem' };

  return (
    <div className={containerClass} style={containerStyle}>
      {verticalAlign === 'bottom' && (
        <svg
          className='absolute top-[0]'
          style={arrowStyle}
          xmlns='http://www.w3.org/2000/svg'
          width={27}
          height={16}
          viewBox='0 0 27 16'
          fill='none'
        >
          <path
            d='M11.9338 0.972278C12.7345 -0.0360367 14.2655 -0.0360351 15.0662 0.972279L27 16H0L11.9338 0.972278Z'
            fill='#F83419'
          />
        </svg>
      )}

      <div className='w-fit flex flex-row items-center gap-[0.4rem] px-[1.2rem] py-[0.6rem] rounded-[1.6rem] bg-primary-700'>
        <span className='caption-m-11 text-white'>{text}</span>
        <Icon
          name='ic_close'
          width={15}
          height={15}
          color='#fff'
          onClick={handleCloseTooltip}
        />
      </div>

      {verticalAlign === 'top' && (
        <svg
          className='absolute bottom-[0]'
          style={arrowStyle}
          xmlns='http://www.w3.org/2000/svg'
          width={27}
          height={16}
          viewBox='0 0 27 16'
          fill='none'
        >
          <path
            d='M15.0662 15.0277C14.2655 16.036 12.7345 16.036 11.9338 15.0277L0 0H27L15.0662 15.0277Z'
            fill='#F83419'
          />
        </svg>
      )}
    </div>
  );
}
