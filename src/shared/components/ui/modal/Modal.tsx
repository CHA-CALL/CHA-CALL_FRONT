import Overlay from '@components/layout/overlay/Overlay';
import { cn } from '@utils/cn';
import type { MouseEvent, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string | ReactNode;
  footer?: ReactNode;
}
interface ModalSubComponentProps {
  children: ReactNode;
  className?: string;
}

const Header = ({ children, className = '' }: ModalSubComponentProps) => (
  <div
    className={cn('flex w-full flex-col justify-start gap-[0.2rem]', className)}
  >
    {children}
  </div>
);

const Title = ({ children, className = '' }: ModalSubComponentProps) => (
  <p className={cn('title-sb-16 text-grayscale-900', className)}>{children}</p>
);

const Body = ({ children, className = '' }: ModalSubComponentProps) => {
  if (typeof children === 'string') {
    return (
      <p
        className={cn(
          'caption-m-12 text-grayscale-700 whitespace-pre-wrap',
          className
        )}
      >
        {children}
      </p>
    );
  }
  return <div className={className}>{children}</div>;
};

const Footer = ({ children, className = '' }: ModalSubComponentProps) => (
  <div className={cn('flex gap-[1rem]', className)}>{children}</div>
);

export default function Modal({
  isOpen,
  handleClose,
  children,
  className,
  title,
  description,
  footer,
}: ModalProps) {
  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const isCommonLayoutMode = !!title;

  return (
    <Overlay isOpen={isOpen} handleClose={handleClose}>
      <div
        className={cn(
          'flex min-w-[27.4rem] flex-col gap-[1.6rem] rounded-[1.6rem] bg-white px-[2rem] pb-[2rem] pt-[2.4rem]',
          className
        )}
        onClick={stopPropagation}
      >
        {isCommonLayoutMode ? (
          <>
            <Header>
              <Title>{title}</Title>
              {description && <Body>{description}</Body>}
            </Header>
            {footer && <Footer>{footer}</Footer>}
          </>
        ) : (
          children
        )}
      </div>
    </Overlay>
  );
}

Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;
