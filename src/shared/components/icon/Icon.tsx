// shared/ui/Icon.tsx
import React, { forwardRef } from 'react';

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

interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: IconId;
  width?: number;
  height?: number;
  title?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ id, width = 22, height = 22, title, className, style, ...rest }, ref) => {
    // size 숫자면 px 처리
    const w = `${width}px`;
    const h = `${height}px`;

    return (
      <svg
        ref={ref}
        width={w}
        height={h}
        role={title ? 'img' : undefined}
        aria-labelledby={title ? title : undefined}
        aria-hidden={title ? undefined : true}
        focusable='false'
        className={className}
        style={style}
        {...rest}
      >
        {title && <title id={title}>{title}</title>}
        <use href={`#${id}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
