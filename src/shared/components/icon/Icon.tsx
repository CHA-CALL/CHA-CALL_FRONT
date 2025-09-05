import React, { forwardRef, useId } from 'react';

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
  | 'ic_calendar';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconId;
  width?: number;
  height?: number;
  color?: string;
  title?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      width = 22,
      height = 22,
      color = '#565B65',
      title,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const titleId = useId();
    const w = `${width}px`;
    const h = `${height}px`;

    return (
      <svg
        ref={ref}
        width={w}
        height={h}
        role={title ? 'img' : undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-hidden={title ? undefined : true}
        focusable='false'
        className={className}
        style={{ ...style, color }}
        {...rest}
      >
        {title && <title id={titleId}>{title}</title>}
        <use href={`#${name}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
