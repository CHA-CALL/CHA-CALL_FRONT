import DefaultProfile from '@assets/img/img_avatar.png';
import { Icon } from '@components/icon/Icon';

interface ProfileImageSectionProps {
  handleOpenBottomSheet: () => void;
}

export default function ProfileImageSection({
  handleOpenBottomSheet,
}: ProfileImageSectionProps) {
  return (
    <div className='relative p-[0.5rem]' onClick={handleOpenBottomSheet}>
      <img
        className='h-[8rem] w-[8rem]'
        src={DefaultProfile}
        alt='프로필사진'
      />
      <div className='absolute bottom-[0.8rem] right-[0] z-50 flex h-[3rem] w-[3rem] items-center rounded-[1.5rem] border border-grayscale-200 bg-white p-[0.5rem]'>
        <Icon name='ic_camera' color='#838992' />
      </div>
    </div>
  );
}
