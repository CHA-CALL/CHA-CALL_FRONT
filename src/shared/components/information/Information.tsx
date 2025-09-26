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
        'bg-primary-25 flex items-center gap-[0.6rem] rounded-[1.6rem] px-[1.2rem] py-[1rem]',
        className
      )}
    >
      <Icon name={iconId} width={22} height={22} className='text-primary-700' />
      <p className='title-sb-12 text-primary-700'>{text}</p>
    </div>
  );
}
