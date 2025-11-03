import { Icon, type IconId } from '@components/icon/Icon';

interface InfoRowProps {
  iconId: IconId;
  children?: React.ReactNode;
}

export default function InfoRow({ iconId, children }: InfoRowProps) {
  return (
    <div className='flex items-center gap-[0.6rem]'>
      <Icon
        name={iconId}
        width={16}
        height={16}
        className='text-grayscale-300'
      />
      {children}
    </div>
  );
}
