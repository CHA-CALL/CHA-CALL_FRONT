// shared/ui/Icon.tsx
import { forwardRef, useId } from 'react';

export type IconId =
  | 'ic_chat'
  | 'ic_check'
  | 'ic_close'
  | 'ic_confirm'
  | 'ic_error'
  | 'ic_locate'
  | 'ic_mypage'
  | 'ic_next'
  | 'ic_register'
  | 'ic_search'
  | 'ic_support'
  | 'ic_team'
  | 'ic_trash'
  | 'ic_back'
  | 'ic_calender';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: IconId;
  size?: number | string;
  title?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ id, size = 22, title, className, style, ...rest }, ref) => {
    const titleId = useId();

    // size 숫자면 px 처리
    const w = typeof size === 'number' ? `${size}px` : size;
    const h = w;

    return (
      <svg
        ref={ref}
        width={w}
        height={h}
        role='img'
        focusable='false'
        className={className}
        {...rest}
      >
        {title && <title id={titleId}>{title}</title>}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <use href={`#${id}`} xlinkHref={`#${id}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
