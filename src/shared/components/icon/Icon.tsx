import React, { forwardRef, useId } from 'react';

export type IconId =
  | 'ic_back'
  | 'ic_calendar'
  | 'ic_camera'
  | 'ic_chat'
  | 'ic_chat_dot'
  | 'ic_check'
  | 'ic_close'
  | 'ic_close_white'
  | 'ic_confirm'
  | 'ic_dash'
  | 'ic_dot'
  | 'ic_down'
  | 'ic_error'
  | 'ic_error_small'
  | 'ic_filter'
  | 'ic_locate'
  | 'ic_mypage'
  | 'ic_next'
  | 'ic_register'
  | 'ic_search'
  | 'ic_star'
  | 'ic_support'
  | 'ic_team'
  | 'ic_trash'
  | 'ic_up'
  | 'ic_download'
  | 'ic_star_full'
  | 'ic_star_half';


interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconId;
  width?: number;
  height?: number;
  title?: string;
  className?: string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      name,
      width = 22,
      height = 22,
      title,
      className = 'text-grayscale-600',
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
        style={style}
        {...rest}
      >
        {title && <title id={titleId}>{title}</title>}
        <use href={`#${name}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
