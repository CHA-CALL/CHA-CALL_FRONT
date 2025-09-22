import { Icon, type IconId } from '@shared/components/icon/Icon';
import { cn } from '@shared/utils/cn';

interface InformationProps {
  iconId: IconId;
  text: string;
  className?: string;
}

export default function Information({
  iconId,
  text,
  className,
}: InformationProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-[0.6rem] rounded-[1.6rem] bg-primary-25 px-[1.2rem] py-[1rem]',
        className
      )}
    >
      <Icon
        name={iconId}
        width={22}
        height={22}
        color='var(--color-primary-700)'
      />
      <p className='text-primary-700 title-sb-12'>{text}</p>
    </div>
  );
}
