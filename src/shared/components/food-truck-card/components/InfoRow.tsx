import { Icon, type IconId } from '@components/icon/Icon';

interface InfoRowProps {
  iconId: IconId;
  children?: string;
}

export default function InfoRow({
  iconId,
  children
}: InfoRowProps) {
  return (
    <div className='flex items-center gap-[0.6rem]'>
      <Icon
        name={iconId}
        width={16}
        height={16}
        className='text-grayscale-300'
      />
      <span className='caption-m-11 text-grayscale-700 line-clamp-1'>
        {children}
      </span>
    </div>
  );
}